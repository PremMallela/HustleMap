import { useEffect, useState } from "react";
import { useUniformTheme } from "../../../utils/hooks/useUniformTheme";
import {
  Box,
  Typography,
  CircularProgress,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import axios from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sharedLayouts/Sidebar";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const getColorByType = (type) => {
  switch (type) {
    case "upskilling": return "#3B82F6";
    case "project": return "#22C55E";
    case "struggle": return "#FACC15";
    case "win": return "#A855F7";
    default: return "#9CA3AF";
  }
};

const formatMonthYear = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
};

const SortableEvent = ({ event, isMobile }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: event._id });

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      position="relative"
      width={isMobile ? 140 : 170}
      textAlign="center"
      mx={1}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
    >
      <Box
        position="absolute"
        top="35%"
        left="50%"
        sx={{
          transform: "translate(-50%, -100%)",
          textAlign: "center",
          px: 1,
          zIndex: 3,
          maxWidth: 250,
          whiteSpace: "normal",
        }}
      >
        <Typography variant="subtitle2">{event.title}</Typography>
      </Box>

      <Tooltip
        title={
          <>
            <Typography variant="subtitle2">{event.title}</Typography>
            <Typography variant="caption" color="grey.200">
              {formatMonthYear(event.period.start)} – {formatMonthYear(event.period.end)}
            </Typography>
            <Typography mt={1}>{event.description}</Typography>
          </>
        }
        arrow
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={16}
          height={16}
          borderRadius="50%"
          bgcolor={getColorByType(event.type)}
          sx={{
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            transition: "transform 0.2s",
            "&:hover": { transform: "translate(-50%, -50%) scale(1.5)" }
          }}
        />
      </Tooltip>

      <Box position="absolute" top="65%" left="50%" sx={{ transform: 'translateX(-50%)' }}>
        <Typography variant="caption" color="textSecondary">
          {formatMonthYear(event.period.start)} – {formatMonthYear(event.period.end)}
        </Typography>
      </Box>
    </Box>
  );
};

const TimelineDisplay = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const sensors = useSensors(useSensor(PointerSensor));
  const {primary} = useUniformTheme();

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const { data } = await axios.get("/api/timeline");
        setEvents(data?.events || []);  
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);
  

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      const oldIndex = events.findIndex((event) => event._id === active.id);
      const newIndex = events.findIndex((event) => event._id === over.id);
      const updatedEvents = arrayMove(events, oldIndex, newIndex);
      setEvents(updatedEvents);
      axios.post("/api/timeline", {events: updatedEvents})
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

   if (error) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Alert severity="error">
            {error || "Something went wrong while fetching the HustleTimeline."}
          </Alert>
        </Box>
      );
    }

  if (events.length === 0) {
    return (
      <Box textAlign="center" py={10} px={2}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, fontWeight: 600 }}
        >
          No Events Yet
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={4}>
          You haven’t added anything to your timeline. Start by adding your first hustle!
        </Typography>
        <Box>
          <button
            onClick={() => navigate('/hustleTimeline/editor')}
            style={{
              background:primary,
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Add Your First Event
          </button>
        </Box>
      </Box>
    );
  }

  return (
    <>
    
      <Sidebar />
      <Box p={{ xs: 2, md: 4 }} position="relative" sx={{ ml: { xs: 0, md: '240px' } }}>
        <Typography
          align="center"
          mb={6}
          sx={{ fontSize: { xs: '1.4rem', sm: '2rem', md: '2.5rem' }, fontWeight: 'bold', pl: { xs: "240px", md: 0 } }}
        >
          My Hustle Timeline
        </Typography>

        <Box
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#94a3b8",
              borderRadius: 4
            }
          }}
        >
          <Box
            position="relative"
            display="inline-flex"
            px={2}
            py={10}
            minWidth={events.length * 140}
            height={300}
          >
            <Box
              position="absolute"
              top="50%"
              left={0}
              right={0}
              height={2}
              bgcolor="grey.300"
              zIndex={1}
            />

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={events.map(e => e._id)} strategy={horizontalListSortingStrategy}>
                {events.map((event) => (
                  <SortableEvent key={event._id} event={event} isMobile={isMobile} />
                ))}
              </SortableContext>
            </DndContext>
          </Box>
        </Box>

        <Box position="fixed" bottom={20} right={20} zIndex={10}>
          <button
            onClick={() => navigate('/hustleTimeline/editor')}
            style={{
              background: '#129990',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
              fontWeight: 'bold',
            }}
          >
            Edit Timeline
          </button>
        </Box>
      </Box>
    </>
  );
};

export default TimelineDisplay;

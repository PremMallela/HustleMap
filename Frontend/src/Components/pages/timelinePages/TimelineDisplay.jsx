import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sharedLayouts/Sidebar";

const getColorByType = (type) => {
  switch (type) {
    case "upskilling": return "#3B82F6";
    case "project":    return "#22C55E";
    case "struggle":   return "#FACC15";
    case "win":        return "#A855F7";
    default:           return "#9CA3AF";
  }
};

const formatMonthYear = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
};

const TimelineDisplay = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/timeline",
          { withCredentials: true }
        );
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching timeline:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (events.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" align="left">
              Your Hustle Timeline
            </Typography>

            <button
              onClick={() => navigate('/hustleTimeline/editor')}
              style={{
                background: '#3B82F6',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Edit Timeline
            </button>
          </Box>

        <Box mt={4}>
          <Typography
            component="button"
            onClick={() => navigate("/hustleTimeline/editor")}
            sx={{
              background: "#3B82F6",
              color: "#fff",
              px: 3,
              py: 1,
              border: "none",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": { background: "#2563EB" }
            }}
          >
            Add Events
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <button
        onClick={() => navigate('/hustleTimeline/editor')}
        style={{
          background: '#3B82F6',
          color: '#fff',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Edit Timeline
      </button>
      <Typography variant="h4" align="center" mb={6}>
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
          height={200}
        >
          {/* Horizontal line */}
          <Box
            position="absolute"
            top="50%"
            left={0}
            right={0}
            height={2}
            bgcolor="grey.300"
            zIndex={1}
          />

          {events.map((event, idx) => (
            <Box
              key={idx}
              position="relative"
              width={170}
              textAlign="center"
            >
              {/* Title above */}
              <Box position="absolute"  marginRight="10px"  sx={{ transform: 'translateY(-90%)' }}>
                <Typography variant="subtitle2">
                  {event.title}
                </Typography>
              </Box>

              {/* Dot at center */}
              <Tooltip
                title={
                  <>
                    <Typography variant="subtitle2">{event.title}</Typography>
                    <Typography variant="caption" color="textSecondary">
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

              {/* Date below */}
              <Box position="absolute" top="65%" left="50%" sx={{ transform: 'translateX(-50%)' }}>
                <Typography variant="caption" color="textSecondary">
                  {formatMonthYear(event.period.start)} – {formatMonthYear(event.period.end)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TimelineDisplay;

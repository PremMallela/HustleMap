import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  MenuItem,
  Divider,
  Button,
  LinearProgress
} from "@mui/material";
import { Plus } from "lucide-react";
import axios from "axios";

const MAX_EVENTS = 12;

const defaultEvent = {
  title: "",
  period: {
    start: "",
    end: ""
  },
  description: "",
  type: "upskilling"
};

const defaultTimeline = [
  { ...defaultEvent },
  { ...defaultEvent }
];

const getColorByType = (type) => {
  switch (type) {
    case "upskilling":
      return "bg-blue-500";
    case "project":
      return "bg-green-500";
    case "struggle":
      return "bg-yellow-500";
    case "win":
      return "bg-purple-500";
    default:
      return "bg-gray-400";
  }
};

const Timeline = () => {
  const [timelineEvents, setTimelineEvents] = useState(defaultTimeline);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/timeline", {
          withCredentials: true
        });
        const data = response.data?.events || defaultTimeline;
        setTimelineEvents(data);
      } catch (error) {
        console.error("Error fetching timeline events:", error);
      }finally{
        setTimeout(() => {
          setLoading(false);
        },1000)
      }
    };

    fetchTimeline();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...timelineEvents];

    if (field.startsWith("period.")) {
      const updatedfield = field.split(".")[1];
      updated[index].period = {
        ...updated[index].period,
        [updatedfield]: value
      };
    } else {
      updated[index][field] = value;
    }

    setTimelineEvents(updated);
  };

  const addEvent = () => {
      setTimelineEvents([...timelineEvents, { ...defaultEvent }]);
  };

  const handleSaveTimeline = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/timeline",
        { events: timelineEvents },
        { withCredentials: true }
      );
      console.log("Timeline saved successfully:", response.data);
      Navigate("/hustleTimeline/display");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Error saving timeline");
    }
  }

  if (loading) return <LinearProgress sx={{ mt: 4 }} />;

  return (
    <Box className="p-6 max-w-3xl mx-auto" >
      <Typography variant="h4" className="mb-6 text-center">
        Hustle Timeline
      </Typography>
      <Divider className="mb-6" />

      <Box className="relative border-l-4 border-gray-10 ml-6">
        {timelineEvents.map((event, index) => (
          <Box key={index} className="mb-8 ml-4 relative">
            <Box
              className={`absolute pt-2 w-4 h-4 rounded-full -left-6 top-1.5 ${getColorByType(
                event.type
              )}`}
            />

            <Box className="mb-4 mt-2">
              <TextField
                label="Title"
                variant="outlined"
                size="small"
                fullWidth
                value={event.title}
                onChange={(e) =>
                  handleChange(index, "title", e.target.value)
                }
              />
            </Box>

            <Box className="mb-4">
              <TextField
                label="Start Date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                placeholder="YYYY-MM"
                type ="month"
                size="small"
                width ="50%"
                value={event.period.start}
                onChange={(e) =>
                  handleChange(index, "period.start", e.target.value)
                }
              />
            </Box>

            <Box className="mb-4">
              <TextField
                label="End Date"
                variant="outlined"
                type ="month"
                InputLabelProps={{ shrink: true }}
                placeholder="YYYY-MM"
                size="small"
                width ="50%"
                value={event.period.end}
                onChange={(e) =>
                  handleChange(index, "period.end", e.target.value)
                }
              />
            </Box>

            <Box className="mb-4">
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                value={event.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />
            </Box>

            <Box className="mb-4">
              <TextField
                label="Type"
                select
                size="small"
                fullWidth
                value={event.type}
                onChange={(e) =>
                  handleChange(index, "type", e.target.value)
                }
              >
                <MenuItem value="upskilling">Upskilling</MenuItem>
                <MenuItem value="project">Project</MenuItem>
                <MenuItem value="struggle">Struggle</MenuItem>
                <MenuItem value="win">Win</MenuItem>
              </TextField>
            </Box>
          </Box>
        ))}

          <Box className="flex justify-center mt-6">
            <IconButton color="primary" onClick={addEvent}>
              <Plus />
            </IconButton>
          </Box>
        
        <Box className="flex justify-center mt-8">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveTimeline}
          >
            Save Timeline
          </Button>
          {error && (
            <Typography color="error" className="ml-4">
              {error}
            </Typography>
          )}
        </Box>

      </Box>
    </Box>
  );
};

export default Timeline;

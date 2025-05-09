"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Typography, Container, Paper, Divider, Button, useTheme, CircularProgress } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const PredictionResultPage = () => {
  const [loading, setLoading] = useState(false)
  const [aiAssistance, setAiAssistance] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const predictionData = location.state?.predictionData || null

  const getAIAssistance = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setAiAssistance(
        "Based on the predicted groundwater level and current climate conditions, I recommend implementing water conservation measures. The groundwater level is expected to decrease in the coming months due to lower than average rainfall predictions."
      )
    } catch (error) {
      console.error("Error fetching AI assistance:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!predictionData && !location.state) {
      navigate("/predict")
    }
  }, [predictionData, location.state, navigate])

  if (!predictionData) {
    return (
      <Container sx={{ my: 8, pt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading prediction data...
        </Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ my: 8, pt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/predict")} sx={{ mb: 4 }}>
        Back to Prediction Form
      </Button>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: theme.palette.text.primary,
        }}
      >
        Groundwater Level Prediction Results
      </Typography>

      {/* Dynamically Load PredictionResults */}
      <Box sx={{ mb: 4 }}>
        {(() => {
          const PredictionResults = require("../PredictionResults").default
          return <PredictionResults {...predictionData} />
        })()}
      </Box>

      {/* AI Assistance Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: theme.shape.borderRadius,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <SmartToyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            AI Assistance
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {aiAssistance ? (
          <Typography variant="body1" paragraph>
            {aiAssistance}
          </Typography>
        ) : (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Button
              variant="contained"
              onClick={getAIAssistance}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SmartToyIcon />}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                "&:hover": {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}
            >
              {loading ? "Generating Insights..." : "Get AI Assistance"}
            </Button>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate("/chatbot", { state: { mbgl: predictionData?.mbgl } })}
            >
              Ask AI for Groundwater Advice
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Click to get AI-powered insights and recommendations based on your prediction results.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default PredictionResultPage

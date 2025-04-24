import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Paper
} from '@mui/material';
import {
  Whatshot,
  Opacity,
  Pets,
  Monitor
} from '@mui/icons-material';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';

const Feature = ({ icon: Icon, title, description, animation }) => (
  <Paper
    elevation={3}
    sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 4,
      mb: 3
    }}
    data-aos={animation}
  >
    <Box display="flex" alignItems="center" mb={1}>
      <Icon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: 'green', mr: 2 }} />
      <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
      {description}
    </Typography>
  </Paper>
);

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  return (
    // <Container className='m-0 p-0 overflow-x-hidden' maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
    <Container className='m-0 p-0 overflow-x-hidden' maxWidth="lg" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 4, sm: 6 } }}>

      <Typography
        variant="h3"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        data-aos="fade-down"
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
        }}
      >
        🌾 About Our Seed Protection System
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          mb: 4,
          textAlign: 'center',
          fontSize: { xs: '0.95rem', sm: '1rem' }
        }}
        data-aos="fade-up"
      >
        This IoT-based seed protection system safeguards agricultural seeds stored in rural warehouses
        from threats like high temperature, humidity, rain, fire, and wild animals using smart sensors and automation.
      </Typography>

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Feature
            icon={Whatshot}
            title="Fire Protection"
            description="If fire is detected by the flame sensor, the system instantly activates a water pump to suppress the flames. 
                        Simultaneously, an SMS alert is sent to notify the owner and prevent further damage."
            animation="fade-up"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Feature
            icon={ThermostatAutoIcon}
            title="Temperature Control"
            description="When the ambient temperature exceeds 35°C, a cooling fan is turned on automatically. 
                        This helps maintain a safe environment for seed storage using real-time DHT11 sensor data."
            animation="fade-up"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Feature
            icon={Opacity}
            title="Humidity Control"
            description="The exhaust fan is automatically triggered when humidity crosses 60% threshold. 
                        This prevents mold formation and protects seeds from spoilage due to excess moisture."
            animation="fade-up"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Feature
            icon={ThunderstormIcon}
            title="Rain Detection & Roof Control"
            description="The rain sensor detects water droplets and instantly closes the roof covering the seed storage. 
                        This automated mechanism safeguards seeds from getting wet during sudden rainfall."
            animation="fade-up"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Feature
            icon={Pets}
            title="Wild Animal Intrusion Alert"
            description="If a wild animal approaches, the ultrasonic sensor detects motion and triggers a buzzer. 
                        If the animal touches the barricade, the buzzer is also activated to scare it away and alert the owner."
            animation="fade-up"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Feature
            icon={Monitor}
            title="Real-Time Monitoring"
            description="The system continuously collects sensor data and displays it in a web dashboard. 
                        Users can view live updates, track averages, and download data for better decision-making."
            animation="fade-up"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: { xs: 3, sm: 5 } }} />

      <Box data-aos="zoom-in-up">
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          🧰 Hardware Components Used
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
          ESP32, Arduino UNO, DHT11 Sensor (Temp & Humidity), Rain Sensor, Flame Sensor, Ultrasonic Sensor, Cooling Fan, Exhaust Fan, Water Pump, Servo Motor, Buzzer, 16x2 LCD Display.
        </Typography>
      </Box>

      <Box mt={{ xs: 3, sm: 4 }} data-aos="fade-right">
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          📡 Smart Alerts & Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
          SMS alerts are automatically triggered during fire or critical environmental conditions to keep the owner informed in real-time.
        </Typography>
      </Box>

      <Box mt={{ xs: 3, sm: 4 }} data-aos="fade-left">
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          🌟 Why This Project Matters
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
          It prevents seed damage and loss, increases safety, and brings automation to agricultural storage systems—saving time, money, and resources.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;

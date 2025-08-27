import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';

import { QUIZ_DATA } from '../../constants/quizData';
import { shuffle } from '../../utils';

const Main = ({ startQuiz }) => {
  const [countdownTime, setCountdownTime] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  const timeOptions = {
    hours: [
      { key: 0, text: '0 Hours', value: 0 },
      { key: 1, text: '1 Hour', value: 1 },
      { key: 2, text: '2 Hours', value: 2 },
      { key: 3, text: '3 Hours', value: 3 },
    ],
    minutes: [
      { key: 0, text: '0 Minutes', value: 0 },
      { key: 30, text: '30 Minutes', value: 30 },
      { key: 60, text: '60 Minutes', value: 60 },
      { key: 90, text: '90 Minutes', value: 90 },
      { key: 120, text: '120 Minutes', value: 120 },
    ],
    seconds: [
      { key: 0, text: '0 Seconds', value: 0 },
      { key: 30, text: '30 Seconds', value: 30 },
      { key: 60, text: '60 Seconds', value: 60 },
    ],
  };

  const startTest = () => {
    setProcessing(true);

    if (error) setError(null);

    setTimeout(() => {
      // Shuffle the quiz data and format it for the quiz component
      const shuffledData = shuffle([...QUIZ_DATA]);
      
      // Format data to match expected structure
      const formattedData = shuffledData.map(item => ({
        ...item,
        incorrect_answers: item.options.filter(option => option !== item.correct_answer)
      }));

      setProcessing(false);
      startQuiz(
        formattedData,
        countdownTime.hours * 3600 + countdownTime.minutes * 60 + countdownTime.seconds
      );
    }, 1000);
  };

  return (
    <Container>
      <Segment style={{ padding: '3em 0em' }}>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Header as="h1" style={{ fontSize: '3em', color: '#2185d0', marginBottom: '0.5em' }}>
                <Icon name="graduation cap" />
                QuizStack
              </Header>
              <Header as="h2" style={{ fontSize: '1.7em', color: '#666', fontWeight: 'normal', marginBottom: '2em' }}>
                Start Your Test by Team Beneficient
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Segment raised style={{ padding: '2em' }}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16} textAlign="center">
                      <Header as="h3" style={{ color: '#333', marginBottom: '1em' }}>
                        <Icon name="clock outline" />
                        Set Your Test Duration
                      </Header>
                      <p style={{ fontSize: '1.1em', color: '#666', marginBottom: '2em' }}>
                        Choose how much time you want to complete all 81 questions
                      </p>
                      
                      {error && (
                        <Message error onDismiss={() => setError(null)}>
                          <Message.Header>Error!</Message.Header>
                          {error.message}
                        </Message>
                      )}
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={5}>
                      <label style={{ fontWeight: 'bold', color: '#333' }}>Hours</label>
                      <Dropdown
                        fluid
                        selection
                        name="hours"
                        placeholder="Select Hours"
                        options={timeOptions.hours}
                        value={countdownTime.hours}
                        onChange={handleTimeChange}
                        disabled={processing}
                      />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <label style={{ fontWeight: 'bold', color: '#333' }}>Minutes</label>
                      <Dropdown
                        fluid
                        selection
                        name="minutes"
                        placeholder="Select Minutes"
                        options={timeOptions.minutes}
                        value={countdownTime.minutes}
                        onChange={handleTimeChange}
                        disabled={processing}
                      />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <label style={{ fontWeight: 'bold', color: '#333' }}>Seconds</label>
                      <Dropdown
                        fluid
                        selection
                        name="seconds"
                        placeholder="Select Seconds"
                        options={timeOptions.seconds}
                        value={countdownTime.seconds}
                        onChange={handleTimeChange}
                        disabled={processing}
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={16} textAlign="center" style={{ paddingTop: '2em' }}>
                      <Button
                        primary
                        size="huge"
                        icon="play"
                        labelPosition="left"
                        content={processing ? 'Starting Test...' : 'Start Test Now'}
                        onClick={startTest}
                        disabled={
                          processing || 
                          (!countdownTime.hours && !countdownTime.minutes && !countdownTime.seconds)
                        }
                        style={{
                          background: 'linear-gradient(45deg, #2185d0, #1e70bf)',
                          fontSize: '1.2em',
                          padding: '1em 2em',
                          boxShadow: '0 4px 15px rgba(33, 133, 208, 0.3)'
                        }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Segment style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '2em',
                marginTop: '2em'
              }}>
                <Header as="h4" style={{ color: 'white', marginBottom: '0.5em' }}>
                  <Icon name="heart" />
                  Powered by Imoogle Technology
                </Header>
                <p style={{ fontSize: '1em', margin: 0, opacity: 0.9 }}>
                  Advanced quiz platform built with modern web technologies
                </p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
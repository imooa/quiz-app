import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Grid,
  Header,
  Icon,
  Card,
  Statistic,
  Divider,
} from 'semantic-ui-react';

import { QUIZ_DATA } from '../../constants/quizData';
import { shuffle } from '../../utils';

const Main = ({ startQuiz }) => {
  const [processing, setProcessing] = useState(false);

  const startTest = () => {
    setProcessing(true);

    setTimeout(() => {
      // Shuffle the quiz data and format it for the quiz component
      const shuffledData = shuffle([...QUIZ_DATA]);
      
      // Format data to match expected structure
      const formattedData = shuffledData.map(item => ({
        ...item,
        incorrect_answers: item.options.filter(option => option !== item.correct_answer)
      }));

      setProcessing(false);
      // Fixed 20 minutes (1200 seconds)
      startQuiz(formattedData, 1200);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0'
    }}>
      <Container>
        <Grid centered verticalAlign="middle" style={{ minHeight: '80vh' }}>
          <Grid.Column mobile={16} tablet={12} computer={10}>
            {/* Main Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Header as="h1" inverted style={{ 
                fontSize: '4rem', 
                fontWeight: '300',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                marginBottom: '0.5rem'
              }}>
                <Icon name="graduation cap" />
                QuizStack
              </Header>
              <Header as="h2" inverted style={{ 
                fontSize: '1.5rem', 
                fontWeight: '300',
                opacity: 0.9,
                marginBottom: '0'
              }}>
                Start Your Test by Team Beneficient
              </Header>
            </div>

            {/* Main Card */}
            <Card fluid style={{
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: 'none',
              overflow: 'hidden'
            }}>
              <Card.Content style={{ padding: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <Icon name="clock outline" size="huge" color="blue" />
                  <Header as="h2" style={{ color: '#2185d0', marginTop: '1rem' }}>
                    Ready for Your Assessment?
                  </Header>
                  <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.6' }}>
                    Test your knowledge with our comprehensive quiz featuring 81 carefully curated questions
                  </p>
                </div>

                <Divider />

                {/* Quiz Stats */}
                <Grid columns={3} divided style={{ margin: '2rem 0' }}>
                  <Grid.Column textAlign="center">
                    <Statistic size="small" color="blue">
                      <Statistic.Value>81</Statistic.Value>
                      <Statistic.Label>Questions</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Statistic size="small" color="green">
                      <Statistic.Value>20</Statistic.Value>
                      <Statistic.Label>Minutes</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Statistic size="small" color="orange">
                      <Statistic.Value>Mixed</Statistic.Value>
                      <Statistic.Label>Topics</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                </Grid>

                <Divider />

                {/* Quiz Categories */}
                <div style={{ marginBottom: '2rem' }}>
                  <Header as="h4" style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>
                    <Icon name="list" />
                    Topics Covered
                  </Header>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                    {['Grammar', 'Spelling', 'Mathematics', 'Geography', 'Science', 'History', 'General Knowledge'].map(topic => (
                      <div key={topic} style={{
                        background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <Button
                    size="huge"
                    primary
                    loading={processing}
                    disabled={processing}
                    onClick={startTest}
                    style={{
                      background: processing 
                        ? '#ccc' 
                        : 'linear-gradient(45deg, #2185d0, #1e70bf)',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '1rem 3rem',
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      boxShadow: '0 8px 25px rgba(33, 133, 208, 0.3)',
                      transition: 'all 0.3s ease',
                      transform: processing ? 'scale(0.95)' : 'scale(1)'
                    }}
                  >
                    <Icon name={processing ? 'spinner' : 'play'} loading={processing} />
                    {processing ? 'Preparing Your Test...' : 'Start Test Now'}
                  </Button>
                </div>

                {/* Instructions */}
                <div style={{ 
                  marginTop: '2rem', 
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  borderRadius: '15px',
                  color: 'white'
                }}>
                  <Header as="h5" inverted style={{ marginBottom: '1rem' }}>
                    <Icon name="info circle" />
                    Instructions
                  </Header>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                    <li>You have exactly <strong>20 minutes</strong> to complete all 81 questions</li>
                    <li>Choose the best answer for each question</li>
                    <li>You can navigate between questions freely</li>
                    <li>Your progress will be saved automatically</li>
                    <li>Submit before time runs out for best results</li>
                  </ul>
                </div>
              </Card.Content>
            </Card>

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '15px',
                padding: '1rem',
                color: 'white'
              }}>
                <Icon name="heart" />
                <strong>Powered by Imoogle Technology</strong>
                <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.9 }}>
                  Advanced quiz platform built with modern web technologies
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
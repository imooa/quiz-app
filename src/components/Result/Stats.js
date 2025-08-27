import React from 'react';
import PropTypes from 'prop-types';
import { 
  Header, 
  Button, 
  Grid, 
  Statistic, 
  Icon,
  Card,
  Container
} from 'semantic-ui-react';

import ShareButton from '../ShareButton';
import { calculateScore, calculateGrade, timeConverter } from '../../utils';

const Stats = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  replayQuiz,
  resetQuiz,
}) => {
  const score = calculateScore(totalQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);

  const isPassed = score >= 60;
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0'
    }}>
      <Container>
        <Grid centered>
          <Grid.Column mobile={16} tablet={14} computer={12}>
            {/* Header Card */}
            <Card fluid style={{
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <Card.Content style={{ 
                padding: '3rem 2rem',
                textAlign: 'center',
                background: isPassed 
                  ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                  : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                borderRadius: '20px 20px 0 0',
                color: 'white'
              }}>
                <Icon 
                  name={isPassed ? 'trophy' : 'heart'} 
                  size="huge" 
                  style={{ marginBottom: '1rem' }}
                />
                <Header as="h1" inverted style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '300',
                  margin: '0 0 1rem 0'
                }}>
                  {remarks}
                </Header>
                <Header as="h2" inverted style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '400',
                  margin: 0,
                  opacity: 0.9
                }}>
                  Grade: {grade}
                </Header>
              </Card.Content>
            </Card>

            {/* Stats Cards */}
            <Grid columns={2} stackable style={{ marginBottom: '2rem' }}>
              <Grid.Column>
                <Card fluid style={{
                  borderRadius: '15px',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <Card.Content style={{ padding: '2rem', textAlign: 'center' }}>
                    <Statistic size="large" color={isPassed ? 'green' : 'red'}>
                      <Statistic.Value>{score}%</Statistic.Value>
                      <Statistic.Label>Your Score</Statistic.Label>
                    </Statistic>
                    <div style={{ 
                      marginTop: '1rem',
                      color: '#666',
                      fontSize: '1rem'
                    }}>
                      {correctAnswers} out of {totalQuestions} correct
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card fluid style={{
                  borderRadius: '15px',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  <Card.Content style={{ padding: '2rem', textAlign: 'center' }}>
                    <Statistic size="large" color="blue">
                      <Statistic.Value>
                        {`${Number(hours)}:${String(Number(minutes)).padStart(2, '0')}:${String(Number(seconds)).padStart(2, '0')}`}
                      </Statistic.Value>
                      <Statistic.Label>Time Taken</Statistic.Label>
                    </Statistic>
                    <div style={{ 
                      marginTop: '1rem',
                      color: '#666',
                      fontSize: '1rem'
                    }}>
                      Out of 20:00 minutes
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>

            {/* Performance Breakdown */}
            <Card fluid style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <Card.Content>
                <Header as="h3" style={{ color: '#333', marginBottom: '1.5rem' }}>
                  <Icon name="chart bar" />
                  Performance Summary
                </Header>
                <Grid columns={4} divided textAlign="center">
                  <Grid.Column>
                    <Statistic size="mini" color="green">
                      <Statistic.Value>{correctAnswers}</Statistic.Value>
                      <Statistic.Label>Correct</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic size="mini" color="red">
                      <Statistic.Value>{totalQuestions - correctAnswers}</Statistic.Value>
                      <Statistic.Label>Incorrect</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic size="mini" color="blue">
                      <Statistic.Value>60%</Statistic.Value>
                      <Statistic.Label>Pass Mark</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic size="mini" color={isPassed ? 'green' : 'orange'}>
                      <Statistic.Value>{isPassed ? 'PASS' : 'RETRY'}</Statistic.Value>
                      <Statistic.Label>Result</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>

            {/* Action Buttons */}
            <Card fluid style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <Card.Content style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <Button
                    size="huge"
                    primary
                    onClick={replayQuiz}
                    style={{
                      background: 'linear-gradient(45deg, #2185d0, #1e70bf)',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '1rem 2rem',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: '0.5rem',
                      boxShadow: '0 8px 25px rgba(33, 133, 208, 0.3)'
                    }}
                  >
                    <Icon name="redo" />
                    Try Again
                  </Button>
                  <Button
                    size="huge"
                    secondary
                    onClick={resetQuiz}
                    style={{
                      background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '1rem 2rem',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: '0.5rem',
                      color: 'white',
                      boxShadow: '0 8px 25px rgba(245, 87, 108, 0.3)'
                    }}
                  >
                    <Icon name="home" />
                    Back to Home
                  </Button>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <ShareButton />
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
                  Thank you for using QuizStack by Team Beneficient
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

Stats.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Stats;
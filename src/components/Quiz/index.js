import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Icon,
  Message,
  Header,
  Grid,
  Progress,
  Card,
} from 'semantic-ui-react';
import he from 'he';

import Countdown from '../Countdown';
import { getLetter } from '../../utils';

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questionIndex]);

  const handleItemClick = (option) => {
    setUserSlectedAns(option);
  };

  const handleNext = () => {
    let point = 0;
    if (userSlectedAns === he.decode(data[questionIndex].correct_answer)) {
      point = 1;
    }

    const qna = questionsAndAnswers;
    qna.push({
      question: he.decode(data[questionIndex].question),
      user_answer: userSlectedAns,
      correct_answer: he.decode(data[questionIndex].correct_answer),
      point,
    });

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = timeTaken => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  const progressPercent = ((questionIndex + 1) / data.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem 0'
    }}>
      <Container>
        {/* Header with Progress */}
        <Card fluid style={{
          borderRadius: '20px 20px 0 0',
          border: 'none',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <Card.Content style={{ padding: '1.5rem' }}>
            <Grid>
              <Grid.Column width={8}>
                <Header as="h2" style={{ color: '#2185d0', margin: 0 }}>
                  <Icon name="help circle" />
                  Question {questionIndex + 1} of {data.length}
                </Header>
              </Grid.Column>
              <Grid.Column width={8} textAlign="right">
                <Countdown
                  countdownTime={countdownTime}
                  timeOver={timeOver}
                  setTimeTaken={setTimeTaken}
                />
              </Grid.Column>
            </Grid>
            <Progress 
              percent={progressPercent} 
              color="blue" 
              style={{ marginTop: '1rem', marginBottom: '0' }}
            />
          </Card.Content>
        </Card>

        {/* Question Card */}
        <Card fluid style={{
          borderRadius: '0 0 20px 20px',
          border: 'none',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginTop: '-1px'
        }}>
          <Card.Content style={{ padding: '2rem' }}>
            {/* Question */}
            <Message size="large" style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontSize: '1.2rem',
              fontWeight: '500',
              textAlign: 'center',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <strong>Q{questionIndex + 1}.</strong> {he.decode(data[questionIndex].question)}
            </Message>

            {/* Options */}
            <Header as="h4" style={{ color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>
              <Icon name="hand point right" />
              Choose the correct answer:
            </Header>

            <Grid columns={1} stackable>
              {data[questionIndex].options.map((option, i) => {
                const letter = getLetter(i);
                const decodedOption = he.decode(option);
                const isSelected = userSlectedAns === decodedOption;

                return (
                  <Grid.Column key={decodedOption} style={{ marginBottom: '1rem' }}>
                    <Card 
                      fluid
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: isSelected ? '3px solid #2185d0' : '2px solid #e0e0e0',
                        borderRadius: '15px',
                        background: isSelected 
                          ? 'linear-gradient(135deg, #2185d0, #1e70bf)' 
                          : 'white',
                        color: isSelected ? 'white' : '#333',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: isSelected 
                          ? '0 8px 25px rgba(33, 133, 208, 0.3)' 
                          : '0 4px 15px rgba(0,0,0,0.1)'
                      }}
                      onClick={() => handleItemClick(decodedOption)}
                    >
                      <Card.Content style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            background: isSelected ? 'rgba(255,255,255,0.2)' : '#2185d0',
                            color: isSelected ? 'white' : 'white',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            {letter}
                          </div>
                          <div style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: isSelected ? '600' : '500',
                            lineHeight: '1.4'
                          }}>
                            {decodedOption}
                          </div>
                        </div>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
            </Grid>

            {/* Next Button */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button
                size="huge"
                primary
                disabled={!userSlectedAns}
                onClick={handleNext}
                style={{
                  background: userSlectedAns 
                    ? 'linear-gradient(45deg, #2185d0, #1e70bf)' 
                    : '#ccc',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '1rem 3rem',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  boxShadow: userSlectedAns 
                    ? '0 8px 25px rgba(33, 133, 208, 0.3)' 
                    : 'none'
                }}
              >
                {questionIndex === data.length - 1 ? (
                  <>
                    <Icon name="checkmark" />
                    Submit Quiz
                  </>
                ) : (
                  <>
                    Next Question
                    <Icon name="arrow right" />
                  </>
                )}
              </Button>
            </div>

            {/* Helper Text */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '1rem',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              {!userSlectedAns && 'Please select an answer to continue'}
              {userSlectedAns && (questionIndex === data.length - 1 
                ? 'Click Submit to finish your quiz' 
                : 'Click Next to continue to the next question'
              )}
            </div>
          </Card.Content>
        </Card>
      </Container>
    </div>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
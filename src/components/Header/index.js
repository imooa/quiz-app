import React, { useState } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);

  let isAppInstalled = false;

  if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    setPromptEvent(e);
  });

  const installApp = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  };

  return (
    <Menu 
      stackable 
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '0',
        margin: '0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Menu.Item header style={{ border: 'none' }}>
        <h1 style={{ 
          color: 'white', 
          margin: 0, 
          fontSize: '1.8rem',
          fontWeight: '300',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          <Icon name="graduation cap" style={{ marginRight: '0.5rem' }} />
          QuizStack
        </h1>
      </Menu.Item>
      {promptEvent && !isAppInstalled && (
        <Menu.Item position="right" style={{ border: 'none' }}>
          <Button
            inverted
            icon="download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
            style={{
              borderRadius: '25px',
              fontWeight: '600'
            }}
          />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
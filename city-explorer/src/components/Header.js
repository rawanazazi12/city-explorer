import React from 'react';
import Card from 'react-bootstrap/Card';


// import '../App.css';


class Header extends React.Component {
  render() {
    return (
      [
        // 'Primary',
        // 'Secondary',
        // 'Success',
        'Danger',
        // 'Warning',
        // 'Info',
        // 'Light',
        // 'Dark',
      ].map((variant, idx) => (
        <Card
          bg={variant.toLowerCase()}
          key={idx}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '100%' }}
          className="mb-2"
        >
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Title style={{textAlign:'center', fontSize:'30px'}}> City Explorer </Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      ))
    );
  }
}

export default Header;
import React from 'react';
import {
  Row,
  Col,
  Typography,
} from 'antd';

const { Title, Text } = Typography;

const CompensationHeader = (props) => {
  const { company, position, totalCompensation } = props;
  return (
    <>
      <Row justify='space-between' wrap={false} align='middle'>
        <Col justify='start'>
          <Title style={{ display: 'inline-block' }}>{company}</Title>
          <Text style={{ display: 'inline-block', margin: '10px' }}>
            {position}
          </Text>
        </Col>
        <Col style={{ whiteSpace: 'nowrap' }}>
          <Title style={{ display: 'inline-block' }}>
            {totalCompensation}
            $
          </Title>
          <div style={{ display: 'inline-block', margin: '10px' }}>
            <Text>starting</Text>
            <br />
            <Text>compensation</Text>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CompensationHeader;

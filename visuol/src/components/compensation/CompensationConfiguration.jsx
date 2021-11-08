import React from 'react';
import {
  Slider, PageHeader, Row, Col, Divider,
} from 'antd';
import numberWithCommas from '../../tools/numbersWithCommas';

const SECTION_HEADER_CLASSNAME = 'section-header';

const CompensationSlider = (props) => {
  const {
    min,
    max,
    defaultValue,
    updateValue,
    sliderColor,
  } = props;

  return (
    <Slider
      defaultValue={defaultValue}
      min={min}
      max={max}
      onChange={updateValue}
      trackStyle={{ backgroundColor: sliderColor }}
          // TODO: currently box shadow (ring around handle) is still default blue.
          // Figure out code to change this.
      handleStyle={{ borderColor: sliderColor }}
    />
  );
};

const CompensationConfiguration = (props) => {
  const {
    base, bonus, updateBaseRate, updateBonusRate, baseColor, bonusColor,
  } = props;

  return (
    <>
      <PageHeader
        className={SECTION_HEADER_CLASSNAME}
        title='Growth'
        subTitle='Add your growth expectations. Each slider represents your projected yearly growth by percentage.'
      />
      <Row gutter={[8, 8]}>
        <Col style={{ textAlign: 'right', whiteSpace: 'nowrap' }} span={4}>
          <h1>Base Salary</h1>
          <br />
          <h1>Yearly Bonus</h1>
        </Col>
        <Divider type='vertical' style={{ height: 'auto' }} span={6} />
        <Col>
          <h1>
            $
            {numberWithCommas(base)}
          </h1>
          <br />
          <h1>
            $
            {numberWithCommas(bonus)}
          </h1>
        </Col>
        <Col span={10}>
          <CompensationSlider
            defaultValue={0}
            min={0}
            max={50}
            updateValue={updateBaseRate}
            sliderColor={baseColor}
          />
          <br />
          <CompensationSlider
            defaultValue={0}
            min={0}
            max={50}
            updateValue={updateBonusRate}
            sliderColor={bonusColor}
          />
        </Col>
      </Row>
    </>
  );
};

export default CompensationConfiguration;

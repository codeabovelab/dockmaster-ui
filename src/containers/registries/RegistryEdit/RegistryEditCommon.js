import React, {PropTypes, Component} from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Checkbox} from 'react-bootstrap';

export default class RegistryEditCommon extends Component {
  static propTypes ={
    values: PropTypes.object.isRequired,
    param: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired
  };

  renderInput(type, title, placeholder, field) {
    return (
      <FormGroup validationState={(field.error && field.touched) ? "error" : "warning"}>
        <Grid>
          <Row slassName="show-grid">
            <Col sm={2}>
              <ControlLabel>{title}</ControlLabel>
            </Col>
            <Col sm={7}>
              <FormControl type={type} placeholder={placeholder} {...field} />
            </Col>
          </Row>
        </Grid>
      </FormGroup>
    );
  }

  renderLabel(title, field) {
    return (
      <FormGroup>
        <Grid>
          <Row slassName="show-grid">
            <Col sm={2}>
              <ControlLabel>{title}</ControlLabel>
            </Col>
            <Col sm={7}>
              <ControlLabel> {field.value} </ControlLabel>
            </Col>
          </Row>
        </Grid>
      </FormGroup>
    );
  }

  renderTwoCheckboxes(fields) {
    let on1 = 'Enable';
    let off1 = 'Disable';
    let on2 = 'Editable';
    let off2 = 'Read Only';
    return (
      <FormGroup>
        <Grid>
          <Row slassName="show-grid">
            <Col sm={2}>
              -
            </Col>
            <Col sm={2}>
              <Checkbox inline {...fields.disabled}>
                Disabled
              </Checkbox>
            </Col>
            <Col sm={2}>
              <Checkbox inline {...fields.readOnly}>
                Read Only
              </Checkbox>
            </Col>
          </Row>
        </Grid>
      </FormGroup>
    );
  }

  renderButtonSubmit(valid) {
    return (
      <ButtonToolbar>
        <Button bsSize="large"
                bsStyle="primary"
                disabled={!valid}
                type="submit"
        >
          Submit
        </Button>
        <Button bsSize="large"
                onClick={this.props.onHide}
        >
          Cancel
        </Button>

      </ButtonToolbar>
    );
  }
}
import { useState, useEffect, useEffectEvent } from "react";
import {
  OverlayTrigger,
  Tooltip,
  Button,
  CardBody,
  Card,
  Row,
  Col,
  Image,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "./App.css";

function App() {
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);
  const [result, setResult] = useState({ g: 0, s: 0, b: 0 });
  const [operation, setOperation] = useState("+");
  //Operand is used in sum and minus
  //factor is used in mult and percent
  const [operandGold, setOperandGold] = useState(0);
  const [operandSilver, setOperandSilver] = useState(0);
  const [operandBronze, setOperandBronze] = useState(0);
  const [factor, setFactor] = useState(1);

  const validOperations = ["+", "-", "×", "%"];

  const toTotalBronze = (g, s, b) => {
    return Number(g) * 10000 + Number(s) * 100 + Number(b);
  };

  const fromTotalBronze = useEffectEvent((total) => {
    const g = Math.floor(total / 10000);
    const remainder = total % 10000;
    const s = Math.floor(remainder / 100);
    const b = remainder % 100;
    setResult({ g, s, b });
  });

  useEffect(() => {
    const totalInputBronze = toTotalBronze(gold, silver, bronze);
    const totalOperandBronze = toTotalBronze(
      operandGold,
      operandSilver,
      operandBronze,
    );
    let calculatedTotal = 0;
    switch (operation) {
      case "+":
        calculatedTotal = totalInputBronze + totalOperandBronze;
        break;
      case "-":
        calculatedTotal = totalInputBronze - totalOperandBronze;
        break;
      case "×":
        calculatedTotal = totalInputBronze * factor;
        break;
      default:
        calculatedTotal = (totalInputBronze * factor) / 100;
        break;
    }
    fromTotalBronze(calculatedTotal);
  }, [
    gold,
    silver,
    bronze,
    operandGold,
    operandSilver,
    operandBronze,
    factor,
    operation,
  ]);

  const goldTooltip = (name) => (
    <Tooltip id={`tooltip-top-${name}`}>{name} coins</Tooltip>
  );

  const getCoinElementDisabled = (name) => {
    return (
      <Col className="d-flex align-items-center">
        <OverlayTrigger
          className="m-2"
          trigger="click"
          placement="top"
          overlay={goldTooltip(name)}
        >
          <Button className="border-0 bg-transparent">
            <Image
              src={`./imgs/${name}.webp`}
              height={"30px"}
              className="d-block"
            />
          </Button>
        </OverlayTrigger>

        <Form.Group controlId={`${name}-form-disabled`}>
          <Form.Control
            disabled
            readOnly
            className="text-center"
            type="number"
            placeholder="0"
            value={result[name[0]]}
          />
        </Form.Group>
      </Col>
    );
  };

  const getCoinElement = (name, value, onChange, isOperand = false) => {
    return (
      <Col className="d-flex align-items-center">
        <OverlayTrigger
          className="m-2"
          trigger="click"
          placement="top"
          overlay={goldTooltip(name)}
        >
          <Button className="border-0 bg-transparent">
            <Image
              src={`./imgs/${name}.webp`}
              height={"30px"}
              className="d-block"
            />
          </Button>
        </OverlayTrigger>

        <Form.Group controlId={`${name}-form${isOperand ? "-operand" : ""}`}>
          <Form.Control
            className="text-center"
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value || 0)}
          />
        </Form.Group>
      </Col>
    );
  };

  return (
    <div className="container">
      <h1 className="mb-4">💰 MMO Coin Calculator</h1>
      <Card className="d-flex m-2">
        <Card.Title as={"h2"}>Input</Card.Title>
        <CardBody>
          <Row>
            {getCoinElement("gold", gold, setGold)}
            {getCoinElement("silver", silver, setSilver)}
            {getCoinElement("bronze", bronze, setBronze)}
          </Row>
          <Row className="mt-4">
            <Col className="text-end">
              <h2>Operation: </h2>
            </Col>
            <Col>
              <DropdownButton
                size="lg"
                className="mx-3"
                as={"div"}
                title={operation}
                id="operation-dropdown"
              >
                {validOperations.map((op) => (
                  <Dropdown.Item
                    key={`dropdown-${op}`}
                    id={`dropdown-${op}`}
                    eventKey={`dropdown-${op}`}
                    onClick={(e) => setOperation(e.target.innerText)}
                  >
                    {op}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col></Col>
          </Row>
          <Row className="my-4">
            {(operation == "+" || operation == "-") && (
              <>
                {getCoinElement("gold", operandGold, setOperandGold, true)}
                {getCoinElement(
                  "silver",
                  operandSilver,
                  setOperandSilver,
                  true,
                )}
                {getCoinElement(
                  "bronze",
                  operandBronze,
                  setOperandBronze,
                  true,
                )}
              </>
            )}
            {(operation == "×" || operation == "%") && (
              <Col className="mx-5">
                <Form.Group controlId={`$factor-form-${operation}`}>
                  <Form.Control
                    className="text-center"
                    type="number"
                    placeholder="0"
                    defaultValue={factor}
                    onChange={(e) => setFactor(e.target.value || 0)}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>

          <hr />
          <Row>
            {getCoinElementDisabled("gold")}
            {getCoinElementDisabled("silver")}
            {getCoinElementDisabled("bronze")}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;

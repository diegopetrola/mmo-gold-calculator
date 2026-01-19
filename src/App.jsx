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
} from "react-bootstrap";
import "./App.css";

function App() {
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [result, setResult] = useState({ g: 0, s: 0, b: 0 });

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
    const calculatedTotal = totalInputBronze * multiplier;
    fromTotalBronze(calculatedTotal);
  }, [gold, silver, bronze, multiplier]);

  const goldTooltip = (name) => (
    <Tooltip id={`tooltip-top-${name}`}>{name} coins</Tooltip>
  );

  const getCoinElement = (name, onChange) => {
    return (
      <Col>
        <OverlayTrigger
          className="m-2"
          trigger="click"
          placement="top"
          overlay={goldTooltip(name)}
        >
          <Button className="p-0 border-0 bg-transparent">
            <Image src={`./imgs/${name}.webp`} height={"30px"} />
          </Button>
        </OverlayTrigger>

        <Form.Group className="m-2" controlId={`${name}-form`}>
          <Form.Control
            className="text-center"
            type="number"
            placeholder="0"
            defaultValue={0}
            onChange={(e) => onChange(e.target.value)}
          />
        </Form.Group>
      </Col>
    );
  };

  return (
    <div className="container">
      <h1 className="mb-4">💰 MMO Coin Calculator</h1>
      <Card className="m-2">
        <Card.Title as={"h2"}>Input</Card.Title>
        <CardBody>
          <Row>
            {getCoinElement("gold", setGold)}
            {getCoinElement("silver", setSilver)}
            {getCoinElement("bronze", setBronze)}
          </Row>
        </CardBody>
      </Card>

      <div className="card">
        <h2 c>Input</h2>
        <div className="coin-inputs">
          <span className="input-group">
            <label style={{ color: "#ffd700" }}>Gold</label>
            <input
              type="number"
              min="0"
              value={gold}
              onChange={(e) => setGold(e.target.value)}
            />
          </span>
          <div className="input-group">
            <label style={{ color: "#c0c0c0" }}>Silver</label>
            <input
              type="number"
              min="0"
              value={silver}
              onChange={(e) => setSilver(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label style={{ color: "#cd7f32" }}>
              Bronze <img src="./imgs/bronze.webp" height={"20px"}></img>{" "}
            </label>
            <input
              type="number"
              min="0"
              value={bronze}
              onChange={(e) => setBronze(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Operation</h2>
        <div className="input-group">
          <label>Multiplier (x)</label>
          <input
            type="number"
            min="0"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
          />
        </div>
      </div>

      <div className="result-area">
        <h2>Result</h2>
        <div className="coins-display">
          <span className="coin gold">{result.g} G</span>
          <span className="coin silver">{result.s} S</span>
          <span className="coin bronze">{result.b} B</span>
        </div>
        <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
          (Total Value in Bronze: {toTotalBronze(result.g, result.s, result.b)})
        </p>
      </div>
    </div>
  );
}

export default App;

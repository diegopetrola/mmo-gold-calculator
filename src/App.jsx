import { useState } from "react";
import {
  OverlayTrigger,
  Tooltip,
  Button,
  Card,
  Row,
  Col,
  Image,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "./App.css";

const COIN_TYPES = ["gold", "silver", "bronze"];

const toTotalBronze = (wallet) => {
  return (
    Number(wallet.gold || 0) * 10000 +
    Number(wallet.silver || 0) * 100 +
    Number(wallet.bronze || 0)
  );
};

const fromTotalBronze = (total) => {
  const t = Math.floor(total);
  const g = Math.floor(t / 10000);
  const remainder = t % 10000;
  const s = Math.floor(remainder / 100);
  const b = remainder % 100;
  return { gold: g, silver: s, bronze: b };
};

const CoinInput = ({ type, value, onChange, disabled }) => (
  <Col className="d-flex align-items-center mb-2">
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement="top"
      overlay={<Tooltip className="text-capitalize">{type} Coins</Tooltip>}
    >
      <Button variant="link" className="p-0 me-2 border-0">
        <Image src={`./imgs/${type}.webp`} height="30px" alt={type} />
      </Button>
    </OverlayTrigger>

    <Form.Control
      type="number"
      className="text-center"
      placeholder="0"
      value={value === 0 ? "" : value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      readOnly={disabled}
    />
  </Col>
);

const CoinWallet = ({ wallet, setWallet, disabled = false }) => {
  const handleChange = (type, val) => {
    setWallet({ ...wallet, [type]: Number(val) });
  };

  return (
    <Row>
      {COIN_TYPES.map((type) => (
        <CoinInput
          key={type}
          type={type}
          value={wallet[type]}
          onChange={(val) => handleChange(type, val)}
          disabled={disabled}
        />
      ))}
    </Row>
  );
};

function App() {
  const [inputWallet, setInputWallet] = useState({
    gold: 0,
    silver: 0,
    bronze: 0,
  });
  const [operandWallet, setOperandWallet] = useState({
    gold: 0,
    silver: 0,
    bronze: 0,
  });

  const [operation, setOperation] = useState("+");
  const [factor, setFactor] = useState(1);
  const valA = toTotalBronze(inputWallet);
  const valB = toTotalBronze(operandWallet);

  let resultBronze = 0;

  switch (operation) {
    case "+":
      resultBronze = valA + valB;
      break;
    case "-":
      resultBronze = Math.max(0, valA - valB);
      break;
    case "×":
      resultBronze = valA * factor;
      break;
    case "%":
      resultBronze = (valA * factor) / 100;
      break;
    default:
      resultBronze = valA;
  }

  const resultWallet = fromTotalBronze(resultBronze);

  const isScalar = operation === "×" || operation === "%";

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">💰 RPG Coin Calculator</h1>

      <Card className="shadow-sm">
        <Card.Header as="h4">Calculator</Card.Header>
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col sm={3}>
              <h5>Start Amount</h5>
            </Col>
            <Col sm={9}>
              <CoinWallet wallet={inputWallet} setWallet={setInputWallet} />
            </Col>
          </Row>

          <Row className="align-items-center mb-3">
            <Col sm={3}></Col>
            <Col sm={9} className="text-center">
              <DropdownButton
                variant="outline-primary"
                title={operation}
                onSelect={(o) => setOperation(o)}
              >
                <Dropdown.Item eventKey="+">+</Dropdown.Item>
                <Dropdown.Item eventKey="-">-</Dropdown.Item>
                <Dropdown.Item eventKey="×">×</Dropdown.Item>
                <Dropdown.Item eventKey="%">%</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-3">
            {!isScalar ? (
              <>
                <Col sm={3}></Col>
                <Col sm={9}>
                  <CoinWallet
                    wallet={operandWallet}
                    setWallet={setOperandWallet}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col sm={3}>
                  <h5> {operation === "%" ? "Percentage" : "Multiplier"}</h5>
                </Col>
                <Col sm={2}></Col>
                <Col sm={5}>
                  <Form.Group className="d-flex align-items-center">
                    <Form.Control
                      id={`${operation}-form`}
                      className="text-center"
                      type="number"
                      value={factor}
                      onChange={(e) => setFactor(Number(e.target.value))}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
          <hr />
          <Row className="align-items-center mb-2">
            <Col sm={3}>
              <h5>Result</h5>
            </Col>
            <Col sm={9}>
              <CoinWallet wallet={resultWallet} disabled={true} />
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col sm={3}> </Col>
            <Col className="text-center">
              <OverlayTrigger
                trigger={["hover", "focus"]}
                placement="top"
                overlay={<Tooltip>Use Result as the new start amount.</Tooltip>}
              >
                <Button variant="link" className="p-0 me-2 border-0">
                  <Image src={`./imgs/help.svg`} height="30px" alt="help" />
                </Button>
              </OverlayTrigger>
              <Button
                className="p-2 px-4"
                onClick={() => setInputWallet({ ...resultWallet })}
              >
                Use Result
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;

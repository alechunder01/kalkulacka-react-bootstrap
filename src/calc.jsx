import { useState } from 'react';

function Calc() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const a = Number(num1);
    const b = Number(num2);

    if (num1 === '' || num2 === '') {
      setError('Zadej obě čísla prosím');
      return;
    }

    if (isNaN(a) || isNaN(b)) {
      setError('Neplatné číslo');
      return;
    }

    let calculationResult;

    switch (operation) {
      case '+':
        calculationResult = a + b;
        break;
      case '−': // mínus (lepší než - v dropdownu)
      case '-':
        calculationResult = a - b;
        break;
      case '×':
      case '*':
      case 'x':
        calculationResult = a * b;
        break;
      case '÷':
      case '/':
        if (b === 0) {
          setError('Nelze dělit nulou');
          return;
        }
        calculationResult = a / b;
        break;
      default:
        setError('Neplatná operace');
        return;
    }

    // hezčí formát výsledku
    setResult(
      Number.isInteger(calculationResult)
        ? calculationResult
        : Number(calculationResult.toFixed(8))
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg border-0 mt-5">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Kalkulačka</h3>
            </div>

            <div className="card-body p-4">
              {/* Výsledek / chyba */}
              {error && (
                <div className="alert alert-danger text-center mb-4 fs-4" role="alert">
                  {error}
                </div>
              )}

              {result !== null && (
                <div className="alert alert-success text-center mb-4 fs-4 fw-bold">
                  Výsledek: {result}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCalculate();
                }}
              >
                <div className="mb-3">
                  <label htmlFor="num1" className="form-label fw-semibold">
                    První číslo
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="num1"
                    placeholder="Zadej první číslo"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    step="any"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="operation" className="form-label fw-semibold">
                    Operace
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="operation"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                  >
                    <option value="+">+ sčítání</option>
                    <option value="−">− odečítání</option>
                    <option value="×">× násobení</option>
                    <option value="÷">÷ dělení</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="num2" className="form-label fw-semibold">
                    Druhé číslo
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="num2"
                    placeholder="Zadej druhé číslo"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    step="any"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                >
                  Spočítat
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calc;
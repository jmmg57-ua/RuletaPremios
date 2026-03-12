import { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import './App.css'

const prizes = [
  { option: 'Crédito Cloud', fullName: 'Crédito en IONOS Cloud',           style: { backgroundColor: '#003D8F', textColor: '#ffffff' } },
  { option: 'Análisis',      fullName: 'Análisis de infraestructura',       style: { backgroundColor: '#FF6B00', textColor: '#ffffff' } },
  { option: 'Costes',        fullName: 'Revisión de costes ocultos',        style: { backgroundColor: '#0057C2', textColor: '#ffffff' } },
  { option: 'Ahorro Real',   fullName: 'Estimación real de ahorro',         style: { backgroundColor: '#FF8C00', textColor: '#ffffff' } },
  { option: 'Auditoría',     fullName: 'Auditoría exprés post-evento',      style: { backgroundColor: '#004DB3', textColor: '#ffffff' } },
  { option: 'Sesión 1:1',    fullName: 'Sesión 1:1 de revisión cloud',      style: { backgroundColor: '#E55A00', textColor: '#ffffff' } },
  { option: 'Descuentos',    fullName: 'Descuentos en servicios',           style: { backgroundColor: '#0066D6', textColor: '#ffffff' } },
  { option: 'Créditos',      fullName: 'Créditos cloud',                    style: { backgroundColor: '#FF7A00', textColor: '#ffffff' } },
  { option: 'Diagnóstico',   fullName: 'Diagnósticos rápidos',              style: { backgroundColor: '#0052A5', textColor: '#ffffff' } },
]

export default function App() {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [winner, setWinner] = useState(null)
  const [showModal, setShowModal] = useState(false)

  function handleSpin() {
    if (mustSpin) return
    const randomPrize = Math.floor(Math.random() * prizes.length)
    setPrizeNumber(randomPrize)
    setMustSpin(true)
    setWinner(null)
    setShowModal(false)
  }

  function handleStopSpinning() {
    setMustSpin(false)
    setWinner(prizes[prizeNumber].fullName)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-logos">
          <span className="logo-text cl">Cloud<br />Levante</span>
          <span className="header-x">×</span>
          <span className="logo-text ionos">IONOS</span>
        </div>
        <h1 className="title">Ruleta de la Nube</h1>
        <p className="subtitle">Gira y descubre tu premio</p>
      </header>

      <main className="main">
        <div className="wheel-container">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={prizes}
            onStopSpinning={handleStopSpinning}
            outerBorderColor="#003D8F"
            outerBorderWidth={6}
            innerRadius={20}
            innerBorderColor="#003D8F"
            innerBorderWidth={4}
            radiusLineColor="#ffffff"
            radiusLineWidth={2}
            fontSize={12}
            fontWeight="bold"
            perpendicularText={false}
            textDistance={68}
            spinDuration={0.8}
            disableInitialAnimation={true}
          />
        </div>

        <button
          className={`spin-button ${mustSpin ? 'spinning' : ''}`}
          onClick={handleSpin}
          disabled={mustSpin}
        >
          {mustSpin ? 'Girando...' : '¡GIRAR!'}
        </button>
      </main>

      {showModal && winner && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🎉</div>
            <h2 className="modal-title">¡Felicidades!</h2>
            <p className="modal-subtitle">Tu premio es:</p>
            <div className="modal-prize">{winner}</div>
            <p className="modal-note">Pásate por nuestro stand para canjearlo</p>
            <button className="modal-close" onClick={closeModal}>
              ¡Genial!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

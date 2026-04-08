import { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import './App.css'

const prizes = [
  { option: 'Demo IA',           fullName: 'Acceso a demo exclusiva de inteligencia artificial',    style: { backgroundColor: '#003D8F', textColor: '#ffffff' } },
  { option: 'Plan Seguridad',    fullName: 'Guía práctica: Plan de seguridad en 100 días',          style: { backgroundColor: '#FF6B00', textColor: '#ffffff' } },
  { option: 'Auditoría Cyber',   fullName: 'Auditoría express de ciberseguridad',                   style: { backgroundColor: '#0057C2', textColor: '#ffffff' } },
  { option: 'Costes Cloud',      fullName: 'Revisión de costes cloud con recomendaciones',          style: { backgroundColor: '#FF8C00', textColor: '#ffffff' } },
  { option: 'Consultoría 30\'',  fullName: 'Sesión de consultoría (30 min)',                        style: { backgroundColor: '#004DB3', textColor: '#ffffff' } },
  { option: 'Quick Win',         fullName: 'Identificación quick win para tu empresa',              style: { backgroundColor: '#E55A00', textColor: '#ffffff' } },
  { option: 'Casos Uso IA',      fullName: 'Análisis de casos de uso de inteligencia artificial',  style: { backgroundColor: '#0066D6', textColor: '#ffffff' } },
  { option: 'Roadmap Tech',      fullName: 'Mini roadmap tecnológico (primeros pasos)',             style: { backgroundColor: '#FF7A00', textColor: '#ffffff' } },
  { option: 'Vuelve a girar',    fullName: null,                                                    style: { backgroundColor: '#0052A5', textColor: '#ffffff' } },
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
    setWinner(prizes[prizeNumber])
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
            {winner.fullName === null ? (
              <>
                <div className="modal-icon">🔄</div>
                <h2 className="modal-title">¡Inténtalo de nuevo!</h2>
                <p className="modal-subtitle">La ruleta te da otra oportunidad</p>
                <button className="modal-close" onClick={() => { closeModal(); handleSpin() }}>
                  ¡Girar de nuevo!
                </button>
              </>
            ) : (
              <>
                <div className="modal-icon">🎉</div>
                <h2 className="modal-title">¡Enhorabuena!</h2>
                <p className="modal-subtitle">Tu premio es:</p>
                <div className="modal-prize">{winner.fullName}</div>
                <p className="modal-note">Pásate por nuestro stand para canjearlo</p>
                <button className="modal-close" onClick={closeModal}>
                  ¡Genial!
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

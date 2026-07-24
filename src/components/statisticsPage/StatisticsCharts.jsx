// src/components/statisticsPage/StatisticsCharts.jsx
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faTriangleExclamation,
  faUmbrellaBeach,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { dbFirebase } from "../../firebase";
import "./StatisticsCharts.css";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const NIVEL_COLORS = { bajo: "#5cb85c", medio: "#f0ad4e", alto: "#d9534f" };
const NIVEL_LABELS = { bajo: "Bajo", medio: "Medio", alto: "Alto" };

function StatisticsCharts() {
  const [zonas, setZonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark-theme")
  );

  useEffect(() => {
    async function cargar() {
      try {
        const snap = await getDocs(collection(dbFirebase, "zonas"));
        setZonas(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.log(err);
      }
      setCargando(false);
    }
    cargar();
  }, []);

  // Escucha cambios de tema para adaptar los colores de texto de los charts.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark-theme"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const chartTextColor = isDark ? "#9db4c7" : "#444";
  const chartGridColor = isDark ? "rgba(157,180,199,0.15)" : "rgba(0,0,0,0.08)";

  const stats = useMemo(() => {
    const totalZonas = zonas.length;
    const zonasRiesgo = zonas.filter((z) => z.tipo === "riesgo");
    const zonasTuristicas = zonas.filter((z) => z.tipo === "turistica");

    const totalCasos = zonasRiesgo.reduce((sum, z) => sum + (Number(z.cantidadCasos) || 0), 0);

    const porNivel = { bajo: 0, medio: 0, alto: 0 };
    zonasRiesgo.forEach((z) => {
      if (z.nivelRiesgo && porNivel[z.nivelRiesgo] !== undefined) porNivel[z.nivelRiesgo] += 1;
    });

    const casosPorDelito = {};
    zonasRiesgo.forEach((z) => {
      if (!z.tipoDelito) return;
      casosPorDelito[z.tipoDelito] = (casosPorDelito[z.tipoDelito] || 0) + (Number(z.cantidadCasos) || 0);
    });

    const topZonas = [...zonasRiesgo]
      .filter((z) => z.cantidadCasos)
      .sort((a, b) => (b.cantidadCasos || 0) - (a.cantidadCasos || 0))
      .slice(0, 5);

    const zonaMasCritica = topZonas[0] || null;

    return {
      totalZonas,
      totalRiesgo: zonasRiesgo.length,
      totalTuristicas: zonasTuristicas.length,
      totalCasos,
      porNivel,
      casosPorDelito,
      topZonas,
      zonaMasCritica,
    };
  }, [zonas]);

  const tipoZonaData = {
    labels: ["Zonas de riesgo", "Zonas turísticas"],
    datasets: [
      {
        data: [stats.totalRiesgo, stats.totalTuristicas],
        backgroundColor: ["#d9534f", "#5cb85c"],
        borderWidth: 0,
      },
    ],
  };

  const nivelData = {
    labels: Object.keys(stats.porNivel).map((k) => NIVEL_LABELS[k]),
    datasets: [
      {
        data: Object.values(stats.porNivel),
        backgroundColor: Object.keys(stats.porNivel).map((k) => NIVEL_COLORS[k]),
        borderWidth: 0,
      },
    ],
  };

  const delitoLabels = Object.keys(stats.casosPorDelito);
  const delitoData = {
    labels: delitoLabels,
    datasets: [
      {
        label: "Casos registrados",
        data: delitoLabels.map((l) => stats.casosPorDelito[l]),
        backgroundColor: "#3f82fd",
        borderRadius: 6,
        maxBarThickness: 42,
      },
    ],
  };

  const topZonasData = {
    labels: stats.topZonas.map((z) => z.nombre),
    datasets: [
      {
        label: "Casos registrados",
        data: stats.topZonas.map((z) => z.cantidadCasos || 0),
        backgroundColor: stats.topZonas.map((z) => NIVEL_COLORS[z.nivelRiesgo] || "#3f82fd"),
        borderRadius: 6,
        maxBarThickness: 34,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { color: chartTextColor } },
    },
  };

  const barOptionsVertical = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: chartTextColor }, grid: { color: chartGridColor } },
      y: { beginAtZero: true, ticks: { color: chartTextColor, precision: 0 }, grid: { color: chartGridColor } },
    },
  };

  const barOptionsHorizontal = {
    ...barOptionsVertical,
    indexAxis: "y",
  };

  if (cargando) {
    return (
      <section className="stats-charts">
        <p className="stats-charts__loading">Cargando estadísticas...</p>
      </section>
    );
  }

  if (stats.totalZonas === 0) {
    return (
      <section className="stats-charts">
        <div className="stats-charts__header">
          <h1>Estadísticas de SafeExplorEC</h1>
          <p>Aún no hay zonas registradas para generar estadísticas. Vuelve pronto.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="stats-charts">
      <div className="stats-charts__header">
        <h1>Estadísticas de Seguridad y Turismo</h1>
        <p>
          Datos generados en tiempo real a partir de las zonas registradas por el equipo de
          administración de SafeExplorEC.
        </p>
      </div>

      <div className="stats-charts__summary">
        <div className="summary-card">
          <FontAwesomeIcon icon={faMapMarkedAlt} />
          <span className="summary-card__value">{stats.totalZonas}</span>
          <span className="summary-card__label">Zonas registradas</span>
        </div>
        <div className="summary-card summary-card--riesgo">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <span className="summary-card__value">{stats.totalRiesgo}</span>
          <span className="summary-card__label">Zonas de riesgo</span>
        </div>
        <div className="summary-card summary-card--turistica">
          <FontAwesomeIcon icon={faUmbrellaBeach} />
          <span className="summary-card__value">{stats.totalTuristicas}</span>
          <span className="summary-card__label">Zonas turísticas</span>
        </div>
        <div className="summary-card">
          <FontAwesomeIcon icon={faFileLines} />
          <span className="summary-card__value">{stats.totalCasos}</span>
          <span className="summary-card__label">Casos registrados</span>
        </div>
      </div>

      <div className="stats-charts__grid">
        <div className="chart-card">
          <h3>Zonas de riesgo vs. turísticas</h3>
          <div className="chart-card__canvas chart-card__canvas--small">
            <Doughnut data={tipoZonaData} options={doughnutOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Zonas de riesgo por nivel</h3>
          <div className="chart-card__canvas chart-card__canvas--small">
            <Doughnut data={nivelData} options={doughnutOptions} />
          </div>
        </div>

        {delitoLabels.length > 0 && (
          <div className="chart-card chart-card--wide">
            <h3>Casos registrados por tipo de delito</h3>
            <div className="chart-card__canvas">
              <Bar data={delitoData} options={barOptionsVertical} />
            </div>
          </div>
        )}

        {stats.topZonas.length > 0 && (
          <div className="chart-card chart-card--wide">
            <h3>Zonas con más casos registrados</h3>
            <div className="chart-card__canvas">
              <Bar data={topZonasData} options={barOptionsHorizontal} />
            </div>
          </div>
        )}
      </div>

      {stats.zonaMasCritica && (
        <p className="stats-charts__footnote">
          La zona con más casos registrados actualmente es <strong>{stats.zonaMasCritica.nombre}</strong>,
          con <strong>{stats.zonaMasCritica.cantidadCasos}</strong> casos reportados.
        </p>
      )}
    </section>
  );
}

export default StatisticsCharts;

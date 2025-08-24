import React, { useEffect, useMemo, useState } from "react";

const BASE_URL = "https://api.nasa.gov/DONKI";

const TABS = [
  { id: "FLR", label: "Solar Flares" },
  { id: "CME", label: "CMEs" },
  { id: "GST", label: "Geomagnetic Storms" },
  { id: "NOT", label: "Notifications" },
];

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}


function formatDate(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

export default function SpaceWeather() {
 const apiKey = import.meta.env.VITE_NASA_API_KEY
  const [active, setActive] = useState("FLR");
  const [startDate, setStartDate] = useState(formatDate(daysAgo(14)));
  const [endDate, setEndDate] = useState(formatDate(daysFromNow(7)));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [touched, setTouched] = useState(false);

  const effectiveKey = apiKey || (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_NASA_API_KEY : undefined) || "";

  const endpoint = useMemo(() => {
    switch (active) {
      case "FLR":
        return "FLR";
      case "CME":
        return "CME";
      case "GST":
        return "GST";
      case "NOT":
        return "notifications";
      default:
        return "FLR";
    }
  }, [active]);

  async function fetchDonki() {
    setLoading(true);
    setError("");
    setData([]);

    try {
      if (!effectiveKey) {
        setError("Please provide a NASA API key.");
        setLoading(false);
        return;
      }

      const params = new URLSearchParams({
        startDate,
        endDate,
        api_key: effectiveKey,
      });

      const url = `${BASE_URL}/${endpoint}?${params.toString()}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        const msg = json?.error?.message || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      // Handle rate-limit or empty payload conventions
      if (Array.isArray(json)) {
        setData(json);
      } else if (json && typeof json === "object") {
        // Notifications can return an object? Usually array, but be safe
        if (Array.isArray(json.results)) {
          setData(json.results);
        } else if (Array.isArray(json.notifications)) {
          setData(json.notifications);
        } else {
          // Some endpoints might return object for single item; normalize to array
          setData([json]);
        }
      } else {
        setData([]);
      }
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDonki();
  }, [endpoint]);

  const header = (
    <div className="w-full flex items-start flex-col gap-3 p-4 bg-zinc-900/44 backdrop-blur rounded-2xl shadow">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Space Weather</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">FLR · CME · GST · Notifications · CME Analysis</p>
          <p className="mt-3 mb-3">Space Weather refers to the dynamic conditions on the Sun and their impact on Earth and the space environment. Solar activity such as powerful flares, coronal mass ejections, and high-energy particle storms can affect satellites, power grids, communication systems, navigation, and even create dazzling auroras near the poles. By monitoring events like solar flares, CMEs, and geomagnetic storms, scientists and space agencies can better understand and forecast these cosmic disturbances, helping to protect our technology-dependent world while offering the public a front-row seat to the incredible energy of our star.</p>
        </div>
        
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm">Start</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">End</label>
          <input
            type="date"
            value={endDate}
            max={formatDate(daysFromNow(7))}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
          />
        </div>
        <button
          onClick={fetchDonki}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          Apply Range
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={classNames(
              "px-3 py-2 rounded-2xl border transition",
              active === tab.id
                ? "bg-[#9d85e6] font-bold text-black border-zinc-900 dark:border-white"
                : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {!effectiveKey && (
        <p className="text-xs text-amber-600 mt-1">
          Tip: Pass apiKey prop or set NEXT_PUBLIC_NASA_API_KEY. You can also paste your key above and click Refresh.
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-[60vh] w-full mx-auto p-6 text-zinc-900 dark:text-zinc-100">
      {header}

      <section className="mt-4">
        {loading && (
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 animate-pulse">
            Loading {endpoint}…
          </div>
        )}

        {!loading && error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-200 border border-rose-200 dark:border-rose-800">
            {error}
          </div>
        )}

        {!loading && !error && (
          <DataList type={active} items={data} startDate={startDate} endDate={endDate} />
        )}
      </section>

      <footer className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
        Data: NASA DONKI • Range {startDate} → {endDate}
      </footer>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 className="text-xl font-semibold mb-2">{children}</h2>;
}

function Badge({ children, tone = "default" }) {
  const tones = {
    default: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
    good: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
    warn: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
    bad: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200",
  };
  return (
    <span className={classNames("px-2 py-1 rounded-xl text-xs font-medium", tones[tone] || tones.default)}>
      {children}
    </span>
  );
}

function KeyVal({ label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-zinc-500 dark:text-zinc-400 w-36 shrink-0">{label}</span>
      <span className="font-medium break-words">{value ?? "—"}</span>
    </div>
  );
}

function DataList({ type, items, startDate, endDate }) {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <EmptyState type={type} startDate={startDate} endDate={endDate} />
    );
  }

  switch (type) {
    case "FLR":
      return <FLRList items={items} />;
    case "CME":
      return <CMEList items={items} />;
    case "GST":
      return <GSTList items={items} />;
    case "NOT":
      return <NOTList items={items} />;
    default:
      return null;
  }
}

function EmptyState({ type, startDate, endDate }) {
  return (
    <div className="p-8 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
      <p className="text-sm">No {type} events found between {startDate} and {endDate}.</p>
      <p className="text-xs text-zinc-500 mt-1">Try expanding the date range.</p>
    </div>
  );
}

// Renderers 
function FLRList({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((f, i) => (
        <article key={i} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <SectionTitle>Solar Flare</SectionTitle>
            <Badge tone={f.classType?.startsWith("X") ? "bad" : f.classType?.startsWith("M") ? "warn" : "info"}>
              Class {f.classType || "?"}
            </Badge>
          </div>
          <div className="space-y-1">
            <KeyVal label="Begin" value={f.beginTime} />
            <KeyVal label="Peak" value={f.peakTime} />
            <KeyVal label="End" value={f.endTime} />
            <KeyVal label="Active Region" value={f.activeRegionNum} />
            <KeyVal label="Source Location" value={f.sourceLocation} />
            {f.link && (
              <a href={f.link} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm underline">
                Details ↗
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function CMEList({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((c, i) => (
        <article key={i} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <SectionTitle>CME</SectionTitle>
            {c.cmeAnalyses?.[0]?.speed && (
              <Badge
                tone={
                  c.cmeAnalyses[0].speed > 1500
                    ? "bad"
                    : c.cmeAnalyses[0].speed > 800
                    ? "warn"
                    : "info"
                }
              >
                {Math.round(c.cmeAnalyses[0].speed)} km/s
              </Badge>
            )}
          </div>

          <div className="space-y-1">
            <KeyVal label="Start Time" value={c.startTime} />
            <div className="mt-4">
            <KeyVal label="Source" value={c.sourceLocation || c.note} />
            </div>
            {/* Merge advanced CME data if present */}
            {c.cmeAnalyses && c.cmeAnalyses.length > 0
              ? c.cmeAnalyses.map((a, idx) => (
                  <div key={idx} className="p-2 border rounded-xl bg-zinc-50 dark:bg-zinc-900/30">
                    <KeyVal label="Speed (km/s)" value={a.speed} />
                    <KeyVal label="Longitude" value={a.longitude} />
                    <KeyVal label="Latitude" value={a.latitude} />
                    <KeyVal label="Half Angle (°)" value={a.halfAngle} />
                    <KeyVal label="Type" value={a.type} />
                    <KeyVal label="Most Accurate" value={String(!!a.isMostAccurate)} />
                  </div>
                ))
              : (
                  <>
                    <KeyVal label="Latitude" value={c.latitude} />
                    <KeyVal label="Longitude" value={c.longitude} />
                    <KeyVal label="Half Angle" value={c.halfAngle} />
                    <KeyVal label="Type" value={c.type || c.note} />
                  </>
                )}

            {c.link && (
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 text-sm underline"
              >
                DONKI Event ↗
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}


function GSTList({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((g, i) => (
        <article key={i} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <SectionTitle>Geomagnetic Storm</SectionTitle>
            {g.allKpIndex?.[0]?.kpIndex && (
              <Badge tone={g.allKpIndex?.[0]?.kpIndex >= 7 ? "bad" : g.allKpIndex?.[0]?.kpIndex >= 5 ? "warn" : "info"}>
                Kp {g.allKpIndex?.[0]?.kpIndex}
              </Badge>
            )}
          </div>
          <div className="space-y-1">
            <KeyVal label="Start" value={g.startTime} />
            <KeyVal label="End" value={g.endTime} />
            {Array.isArray(g.allKpIndex) && (
              <div className="text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">Kp Series:</span>
                <ul className="list-disc ml-5">
                  {g.allKpIndex.map((kp, idx) => (
                    <li key={idx}>Kp {kp.kpIndex} at {kp.observedTime}</li>
                  ))}
                </ul>
              </div>
            )}
            {g.link && (
              <a href={g.link} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm underline">
                DONKI Event ↗
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function NOTList({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((n, i) => (
        <article key={i} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <SectionTitle>Notification</SectionTitle>
            <Badge tone="info">{n.messageType || n.messageID ? "NASA" : "Info"}</Badge>
          </div>
          <div className="space-y-1">
            <KeyVal label="Message ID" value={n.messageID} />
            <KeyVal label="Type" value={n.messageType} />
            <KeyVal label="Issue Time" value={n.messageIssueTime || n.messageIssueDate} />

            {n.messageBody && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm underline">Show message</summary>
                <pre className="whitespace-pre-wrap text-sm mt-2 p-2 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-800 max-h-60 overflow-auto">{n.messageBody}</pre>
              </details>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

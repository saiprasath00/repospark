import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BadgeCheck,
  BookOpenText,
  Check,
  ChevronRight,
  ClipboardList,
  Github,
  Megaphone,
  Rocket,
  SearchCheck,
  Sparkles,
  Star,
  Target,
  WandSparkles,
} from 'lucide-react';
import './styles.css';

const initialTasks = [
  {
    id: 'readme',
    label: 'Open with one sharp outcome',
    detail: 'First two lines say who it helps and what it improves.',
    impact: 18,
    done: true,
  },
  {
    id: 'demo',
    label: 'Add a live demo path',
    detail: 'Give visitors a zero-install way to feel the product.',
    impact: 16,
    done: false,
  },
  {
    id: 'proof',
    label: 'Show proof before features',
    detail: 'Screenshots, GIFs, sample output, or real use cases.',
    impact: 13,
    done: false,
  },
  {
    id: 'install',
    label: 'Make setup copy-pasteable',
    detail: 'Three commands max before the first visible success.',
    impact: 11,
    done: true,
  },
  {
    id: 'share',
    label: 'Prepare launch posts',
    detail: 'One post each for X, LinkedIn, Reddit, and dev communities.',
    impact: 12,
    done: false,
  },
];

const channels = [
  { name: 'GitHub README', score: 92, tone: 'Clear first impression' },
  { name: 'Product Hunt', score: 78, tone: 'Needs a sharper demo clip' },
  { name: 'Developer Reddit', score: 84, tone: 'Good if framed as a lesson' },
  { name: 'LinkedIn', score: 71, tone: 'Add creator story and result' },
];

function App() {
  const [repoName, setRepoName] = useState('RepoSpark');
  const [tagline, setTagline] = useState('Turn a quiet GitHub repo into a project people understand, try, and star.');
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedChannel, setSelectedChannel] = useState('GitHub README');

  const score = useMemo(() => {
    const base = 41;
    const boost = tasks.filter((task) => task.done).reduce((sum, task) => sum + task.impact, 0);
    return Math.min(99, base + boost);
  }, [tasks]);

  const completed = tasks.filter((task) => task.done).length;
  const activeChannel = channels.find((channel) => channel.name === selectedChannel) ?? channels[0];

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }

  return (
    <main className="app-shell">
      <aside className="side-rail" aria-label="RepoSpark navigation">
        <div className="brand-mark" aria-label="RepoSpark">
          <span className="brand-icon"><Sparkles size={18} /></span>
          <span>RepoSpark</span>
        </div>
        <nav className="rail-nav">
          <a href="#plan" className="active"><Target size={18} /> Plan</a>
          <a href="#readme"><BookOpenText size={18} /> README</a>
          <a href="#launch"><Megaphone size={18} /> Launch</a>
          <a href="#score"><SearchCheck size={18} /> Score</a>
        </nav>
        <div className="rail-note">
          <Github size={18} />
          <p>Built for makers who want their repo page to do real work.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>GitHub star growth workbench</h1>
            <p>Shape your repo page, launch copy, and proof points in one focused pass.</p>
          </div>
          <button className="primary-action" type="button">
            <Rocket size={17} />
            Generate plan
          </button>
        </header>

        <section className="input-band" aria-label="Repository inputs">
          <label>
            Repository name
            <input value={repoName} onChange={(event) => setRepoName(event.target.value)} />
          </label>
          <label>
            One-line promise
            <textarea value={tagline} onChange={(event) => setTagline(event.target.value)} rows="2" />
          </label>
        </section>

        <div className="content-grid">
          <section className="plan-area" id="plan">
            <div className="section-title">
              <div>
                <h2>Star-ready checklist</h2>
                <p>{completed} of {tasks.length} improvements are ready.</p>
              </div>
              <span className="score-pill"><Star size={15} /> {score}/100</span>
            </div>

            <div className="task-list">
              {tasks.map((task) => (
                <button
                  className={`task-row ${task.done ? 'is-done' : ''}`}
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  type="button"
                >
                  <span className="check-circle">{task.done ? <Check size={17} /> : null}</span>
                  <span>
                    <strong>{task.label}</strong>
                    <small>{task.detail}</small>
                  </span>
                  <span className="impact">+{task.impact}</span>
                </button>
              ))}
            </div>

            <div className="preview-grid">
              <article className="readme-preview" id="readme">
                <div className="mini-header">
                  <BookOpenText size={17} />
                  README opening
                </div>
                <h3>{repoName || 'YourRepo'}</h3>
                <p>{tagline}</p>
                <div className="terminal">
                  <span>$ npm install</span>
                  <span>$ npm run dev</span>
                  <span>Local demo ready in 2 seconds</span>
                </div>
              </article>

              <article className="launch-card" id="launch">
                <div className="mini-header">
                  <Megaphone size={17} />
                  Launch copy
                </div>
                <p>
                  I built {repoName || 'this project'} to help developers turn scattered repo
                  polish into a practical star-growth plan. Paste the idea, tune the promise,
                  then ship the checklist.
                </p>
                <button type="button">Copy post <ChevronRight size={16} /></button>
              </article>
            </div>
          </section>

          <aside className="insight-panel" id="score">
            <div className="score-card">
              <div className="score-ring" style={{ '--score': `${score}%` }}>
                <span>{score}</span>
              </div>
              <h2>Repo appeal score</h2>
              <p>Based on clarity, proof, setup speed, and launch readiness.</p>
            </div>

            <section className="channel-panel">
              <div className="mini-header">
                <ClipboardList size={17} />
                Channel fit
              </div>
              <div className="channel-list">
                {channels.map((channel) => (
                  <button
                    className={selectedChannel === channel.name ? 'selected' : ''}
                    key={channel.name}
                    onClick={() => setSelectedChannel(channel.name)}
                    type="button"
                  >
                    <span>{channel.name}</span>
                    <strong>{channel.score}</strong>
                  </button>
                ))}
              </div>
              <p className="channel-note">
                <BadgeCheck size={16} />
                {activeChannel.tone}
              </p>
            </section>

            <section className="spark-panel">
              <WandSparkles size={19} />
              <h3>Next best move</h3>
              <p>
                Add a short animated walkthrough above installation. It is the fastest way
                to convert curious visitors into stars.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

'use client';

import { useState, useCallback } from 'react';
import styles from './page.module.css';

// Data for prompt generation
const animeStyles = [
  { id: 'shonen', name: 'Shonen', desc: 'Ação dinâmica, batalhas épicas' },
  { id: 'shojo', name: 'Shojo', desc: 'Romance, drama emocional' },
  { id: 'isekai', name: 'Isekai', desc: 'Mundos fantásticos' },
  { id: 'slice-of-life', name: 'Slice of Life', desc: 'Cenas cotidianas' },
  { id: 'mecha', name: 'Mecha', desc: 'Robôs gigantes' },
  { id: 'cyberpunk', name: 'Cyberpunk', desc: 'Futurista neon' },
  { id: 'fantasy', name: 'Fantasia', desc: 'Magia e aventura' },
  { id: 'horror', name: 'Horror', desc: 'Atmosfera sombria' },
];

const visualStyles = [
  { id: 'ghibli', name: 'Studio Ghibli', desc: 'Paisagens detalhadas, cores suaves' },
  { id: 'kyoani', name: 'Kyoto Animation', desc: 'Detalhes expressivos, iluminação suave' },
  { id: 'madhouse', name: 'Madhouse', desc: 'Ação fluida, linhas dinâmicas' },
  { id: 'ufotable', name: 'Ufotable', desc: 'Efeitos visuais impressionantes' },
  { id: 'mappa', name: 'MAPPA', desc: 'Realismo moderno' },
  { id: 'trigger', name: 'Trigger', desc: 'Estilo exagerado e energético' },
  { id: 'shaft', name: 'SHAFT', desc: 'Abstrato e artístico' },
  { id: 'wit', name: 'WIT Studio', desc: 'Cinematográfico épico' },
];

const characters = [
  { id: 'protagonist-male', name: 'Protagonista Masculino', desc: 'Herói determinado' },
  { id: 'protagonist-female', name: 'Protagonista Feminina', desc: 'Heroína corajosa' },
  { id: 'magical-girl', name: 'Garota Mágica', desc: 'Poderes mágicos' },
  { id: 'samurai', name: 'Samurai', desc: 'Guerreiro honrado' },
  { id: 'ninja', name: 'Ninja', desc: 'Guerreiro das sombras' },
  { id: 'mage', name: 'Mago/Maga', desc: 'Usuário de magia' },
  { id: 'android', name: 'Androide', desc: 'Ser artificial' },
  { id: 'demon', name: 'Demônio', desc: 'Criatura sobrenatural' },
];

const scenes = [
  { id: 'battle', name: 'Batalha Épica', desc: 'Combate intenso' },
  { id: 'cherry-blossom', name: 'Cerejeiras em Flor', desc: 'Cenário romântico' },
  { id: 'sunset', name: 'Pôr do Sol', desc: 'Momento contemplativo' },
  { id: 'rain', name: 'Cena na Chuva', desc: 'Atmosfera dramática' },
  { id: 'transformation', name: 'Transformação', desc: 'Mudança de forma' },
  { id: 'flying', name: 'Voo/Levitação', desc: 'Movimento aéreo' },
  { id: 'magic-spell', name: 'Lançando Magia', desc: 'Efeitos mágicos' },
  { id: 'running', name: 'Corrida Dinâmica', desc: 'Movimento rápido' },
];

const moods = [
  { id: 'epic', name: 'Épico', color: '#ff6b6b' },
  { id: 'romantic', name: 'Romântico', color: '#ff9ff3' },
  { id: 'melancholic', name: 'Melancólico', color: '#5f27cd' },
  { id: 'peaceful', name: 'Pacífico', color: '#00d2d3' },
  { id: 'intense', name: 'Intenso', color: '#ff9f43' },
  { id: 'mysterious', name: 'Misterioso', color: '#341f97' },
  { id: 'cheerful', name: 'Alegre', color: '#feca57' },
  { id: 'dark', name: 'Sombrio', color: '#2d3436' },
];

const cameraMovements = [
  { id: 'pan', name: 'Pan Suave', desc: 'Movimento horizontal' },
  { id: 'zoom-in', name: 'Zoom In', desc: 'Aproximação dramática' },
  { id: 'zoom-out', name: 'Zoom Out', desc: 'Revelação panorâmica' },
  { id: 'tracking', name: 'Tracking Shot', desc: 'Seguindo o personagem' },
  { id: 'rotating', name: 'Câmera Rotativa', desc: '360° em torno do objeto' },
  { id: 'crane', name: 'Movimento de Grua', desc: 'Elevação vertical' },
  { id: 'dolly', name: 'Dolly Shot', desc: 'Aproximação/afastamento suave' },
  { id: 'static', name: 'Estático', desc: 'Câmera fixa' },
];

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedVisual, setSelectedVisual] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [selectedScene, setSelectedScene] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [customDetails, setCustomDetails] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generatePrompt = useCallback(() => {
    const style = animeStyles.find(s => s.id === selectedStyle);
    const visual = visualStyles.find(v => v.id === selectedVisual);
    const character = characters.find(c => c.id === selectedCharacter);
    const scene = scenes.find(s => s.id === selectedScene);
    const mood = moods.find(m => m.id === selectedMood);
    const camera = cameraMovements.find(c => c.id === selectedCamera);

    let prompt = '2D anime style video, hand-drawn animation aesthetic, ';
    
    if (visual) {
      const visualDescriptions: Record<string, string> = {
        'ghibli': 'Studio Ghibli inspired art style with lush detailed backgrounds, soft watercolor textures, gentle color palette',
        'kyoani': 'Kyoto Animation style with expressive character designs, soft lighting, detailed eyes, fluid movements',
        'madhouse': 'Madhouse studio style with dynamic action lines, bold colors, high contrast shadows',
        'ufotable': 'Ufotable style with stunning visual effects, particle systems, dramatic lighting, smooth animation',
        'mappa': 'MAPPA style with modern realistic proportions, detailed shading, cinematic composition',
        'trigger': 'Trigger studio style with exaggerated poses, bold outlines, energetic color explosions',
        'shaft': 'SHAFT style with abstract artistic compositions, unique camera angles, symbolic imagery',
        'wit': 'WIT Studio style with epic scale compositions, dramatic perspective, detailed action sequences',
      };
      prompt += visualDescriptions[visual.id] || visual.desc;
      prompt += ', ';
    }

    if (style) {
      const styleDescriptions: Record<string, string> = {
        'shonen': 'shonen anime genre with intense action sequences, determined expressions, power-up moments',
        'shojo': 'shojo anime genre with sparkly effects, emotional expressions, romantic atmosphere',
        'isekai': 'isekai fantasy world with magical landscapes, otherworldly creatures, adventure elements',
        'slice-of-life': 'slice of life setting with everyday moments, warm atmosphere, detailed mundane scenes',
        'mecha': 'mecha anime with giant robots, mechanical details, epic scale battles',
        'cyberpunk': 'cyberpunk anime with neon lights, futuristic cityscape, holographic elements, rain-slicked streets',
        'fantasy': 'fantasy anime with magical effects, mystical creatures, enchanted environments',
        'horror': 'horror anime with dark shadows, unsettling atmosphere, psychological tension',
      };
      prompt += styleDescriptions[style.id] || style.desc;
      prompt += ', ';
    }

    if (character) {
      const characterDescriptions: Record<string, string> = {
        'protagonist-male': 'featuring a young male protagonist with determined eyes, spiky or flowing hair, heroic pose',
        'protagonist-female': 'featuring a young female protagonist with expressive eyes, flowing hair movement, confident stance',
        'magical-girl': 'featuring a magical girl with elaborate costume, transformation sparkles, magical staff or wand',
        'samurai': 'featuring a samurai warrior with traditional armor, katana sword, disciplined stance',
        'ninja': 'featuring a ninja character with dark outfit, agile pose, hidden weapons, mysterious aura',
        'mage': 'featuring a mage character with flowing robes, glowing magical circles, elemental effects around hands',
        'android': 'featuring an android character with sleek mechanical parts, glowing circuits, human-like emotions',
        'demon': 'featuring a demon character with horns, supernatural aura, otherworldly presence, intense eyes',
      };
      prompt += characterDescriptions[character.id] || character.desc;
      prompt += ', ';
    }

    if (scene) {
      const sceneDescriptions: Record<string, string> = {
        'battle': 'in an epic battle scene with dynamic poses, speed lines, impact effects, clashing powers',
        'cherry-blossom': 'surrounded by cherry blossom petals floating in the wind, spring setting, pink petals dancing',
        'sunset': 'during golden hour sunset, warm orange and pink sky, silhouette against the sun, contemplative moment',
        'rain': 'in a rainy scene with water droplets, reflective puddles, dramatic lighting through rain',
        'transformation': 'during a transformation sequence with swirling energy, costume change, power awakening',
        'flying': 'flying through the sky, clouds passing by, wind effects on hair and clothes, sense of freedom',
        'magic-spell': 'casting a powerful spell with glowing magic circles, elemental particles, mystical energy beams',
        'running': 'running dynamically with motion blur, determined expression, wind-swept appearance',
      };
      prompt += sceneDescriptions[scene.id] || scene.desc;
      prompt += ', ';
    }

    if (mood) {
      const moodDescriptions: Record<string, string> = {
        'epic': 'epic and grandiose mood, orchestral feeling, heroic atmosphere',
        'romantic': 'romantic and tender mood, soft lighting, intimate atmosphere, gentle emotions',
        'melancholic': 'melancholic and bittersweet mood, muted colors, nostalgic feeling, emotional depth',
        'peaceful': 'peaceful and serene mood, calming colors, tranquil atmosphere, gentle movements',
        'intense': 'intense and thrilling mood, high energy, dramatic tension, powerful emotions',
        'mysterious': 'mysterious and enigmatic mood, shadows and secrets, intriguing atmosphere',
        'cheerful': 'cheerful and bright mood, vibrant colors, joyful expressions, upbeat energy',
        'dark': 'dark and ominous mood, deep shadows, foreboding atmosphere, tension building',
      };
      prompt += moodDescriptions[mood.id] || mood.name;
      prompt += ', ';
    }

    if (camera) {
      const cameraDescriptions: Record<string, string> = {
        'pan': 'smooth horizontal pan camera movement, cinematic sweep',
        'zoom-in': 'dramatic zoom in on subject, focus intensifying',
        'zoom-out': 'zoom out revealing the full scene, epic scale reveal',
        'tracking': 'tracking shot following the character movement, dynamic perspective',
        'rotating': '360 degree rotating camera around the subject, dramatic orbit',
        'crane': 'crane shot moving vertically, ascending or descending view',
        'dolly': 'dolly shot with smooth forward or backward movement, depth emphasis',
        'static': 'static camera with subtle character animation, focused composition',
      };
      prompt += cameraDescriptions[camera.id] || camera.desc;
      prompt += ', ';
    }

    // Add technical quality parameters
    prompt += 'high quality animation, smooth frame interpolation, detailed line art, professional anime production quality, ';
    prompt += 'vibrant cel shading, crisp outlines, expressive animation timing, ';
    prompt += 'anime color palette, Japanese animation style, ';
    
    // Add custom details if provided
    if (customDetails.trim()) {
      prompt += customDetails.trim() + ', ';
    }

    // Final quality tags
    prompt += '4K resolution, masterpiece quality, best anime aesthetics';

    setGeneratedPrompt(prompt);
  }, [selectedStyle, selectedVisual, selectedCharacter, selectedScene, selectedMood, selectedCamera, customDetails]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const randomize = () => {
    setSelectedStyle(animeStyles[Math.floor(Math.random() * animeStyles.length)].id);
    setSelectedVisual(visualStyles[Math.floor(Math.random() * visualStyles.length)].id);
    setSelectedCharacter(characters[Math.floor(Math.random() * characters.length)].id);
    setSelectedScene(scenes[Math.floor(Math.random() * scenes.length)].id);
    setSelectedMood(moods[Math.floor(Math.random() * moods.length)].id);
    setSelectedCamera(cameraMovements[Math.floor(Math.random() * cameraMovements.length)].id);
  };

  const clearAll = () => {
    setSelectedStyle('');
    setSelectedVisual('');
    setSelectedCharacter('');
    setSelectedScene('');
    setSelectedMood('');
    setSelectedCamera('');
    setCustomDetails('');
    setGeneratedPrompt('');
  };

  return (
    <main className={styles.main}>
      {/* Animated Background Elements */}
      <div className={styles.bgElements}>
        <div className={styles.floatingOrb} style={{ top: '10%', left: '10%' }}></div>
        <div className={styles.floatingOrb} style={{ top: '60%', left: '80%' }}></div>
        <div className={styles.floatingOrb} style={{ top: '80%', left: '20%' }}></div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎬</span>
          <h1>Sora 2 Anime Prompt</h1>
        </div>
        <p className={styles.subtitle}>Gerador de Prompts para Vídeos 2D Anime</p>
      </header>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Selection Sections */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🎨</span>
            Estilo Visual do Estúdio
          </h2>
          <div className={styles.optionsGrid}>
            {visualStyles.map((item) => (
              <button
                key={item.id}
                className={`${styles.optionCard} ${selectedVisual === item.id ? styles.selected : ''}`}
                onClick={() => setSelectedVisual(item.id)}
              >
                <span className={styles.optionName}>{item.name}</span>
                <span className={styles.optionDesc}>{item.desc}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>⚔️</span>
            Gênero do Anime
          </h2>
          <div className={styles.optionsGrid}>
            {animeStyles.map((item) => (
              <button
                key={item.id}
                className={`${styles.optionCard} ${selectedStyle === item.id ? styles.selected : ''}`}
                onClick={() => setSelectedStyle(item.id)}
              >
                <span className={styles.optionName}>{item.name}</span>
                <span className={styles.optionDesc}>{item.desc}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>👤</span>
            Tipo de Personagem
          </h2>
          <div className={styles.optionsGrid}>
            {characters.map((item) => (
              <button
                key={item.id}
                className={`${styles.optionCard} ${selectedCharacter === item.id ? styles.selected : ''}`}
                onClick={() => setSelectedCharacter(item.id)}
              >
                <span className={styles.optionName}>{item.name}</span>
                <span className={styles.optionDesc}>{item.desc}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🎭</span>
            Tipo de Cena
          </h2>
          <div className={styles.optionsGrid}>
            {scenes.map((item) => (
              <button
                key={item.id}
                className={`${styles.optionCard} ${selectedScene === item.id ? styles.selected : ''}`}
                onClick={() => setSelectedScene(item.id)}
              >
                <span className={styles.optionName}>{item.name}</span>
                <span className={styles.optionDesc}>{item.desc}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>✨</span>
            Atmosfera/Mood
          </h2>
          <div className={styles.moodGrid}>
            {moods.map((item) => (
              <button
                key={item.id}
                className={`${styles.moodCard} ${selectedMood === item.id ? styles.selected : ''}`}
                onClick={() => setSelectedMood(item.id)}
                style={{ '--mood-color': item.color } as React.CSSProperties}
              >
                <span className={styles.moodName}>{item.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🎥</span>
            Movimento de Câmera
          </h2>
          <div className={styles.optionsGrid}>
            {cameraMovements.map((item) => (
              <button
                key={item.id}
                className={`${styles.optionCard} ${selectedCamera === item.id ? styles.selected : ''}`}
                onClick={() => setSelectedCamera(item.id)}
              >
                <span className={styles.optionName}>{item.name}</span>
                <span className={styles.optionDesc}>{item.desc}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📝</span>
            Detalhes Customizados
          </h2>
          <textarea
            className={styles.customInput}
            placeholder="Adicione detalhes específicos aqui... (ex: cabelo azul, olhos vermelhos, espada flamejante, castelo no fundo)"
            value={customDetails}
            onChange={(e) => setCustomDetails(e.target.value)}
            rows={3}
          />
        </section>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button className={styles.randomButton} onClick={randomize}>
            🎲 Aleatorizar
          </button>
          <button className={styles.clearButton} onClick={clearAll}>
            🗑️ Limpar
          </button>
          <button className={styles.generateButton} onClick={generatePrompt}>
            ✨ Gerar Prompt
          </button>
        </div>

        {/* Generated Prompt */}
        {generatedPrompt && (
          <section className={styles.resultSection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📋</span>
              Seu Prompt para Sora 2
            </h2>
            <div className={styles.promptResult}>
              <p className={styles.promptText}>{generatedPrompt}</p>
              <button 
                className={`${styles.copyButton} ${copied ? styles.copied : ''}`} 
                onClick={copyToClipboard}
              >
                {copied ? '✓ Copiado!' : '📋 Copiar Prompt'}
              </button>
            </div>
          </section>
        )}

        {/* Tips Section */}
        <section className={styles.tipsSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>💡</span>
            Dicas para Melhores Resultados
          </h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <span className={styles.tipIcon}>🎯</span>
              <h3>Seja Específico</h3>
              <p>Quanto mais detalhes você adicionar, melhor o resultado. Descreva cores, roupas e cenário.</p>
            </div>
            <div className={styles.tipCard}>
              <span className={styles.tipIcon}>🎬</span>
              <h3>Pense em Movimento</h3>
              <p>Sora 2 cria vídeos! Descreva ações e movimentos que você quer ver no vídeo.</p>
            </div>
            <div className={styles.tipCard}>
              <span className={styles.tipIcon}>🖼️</span>
              <h3>Referências Visuais</h3>
              <p>Mencionar estúdios de anime específicos ajuda a definir o estilo visual desejado.</p>
            </div>
            <div className={styles.tipCard}>
              <span className={styles.tipIcon}>⚡</span>
              <h3>Combine Elementos</h3>
              <p>Misture diferentes estilos e elementos para criar cenas únicas e originais.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>🎬 Sora 2 Anime Prompt Generator • Crie vídeos incríveis de anime 2D</p>
        <p className={styles.footerNote}>Use estes prompts com Sora 2 da OpenAI para gerar vídeos anime</p>
      </footer>
    </main>
  );
}

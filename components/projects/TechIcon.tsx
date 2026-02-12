import { 
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiPython,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiGo,
  SiRust,
  SiSolidity,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiTensorflow,
  SiPytorch,
  SiDjango,
  SiFastapi,
  SiExpress,
  SiTailwindcss,
  SiBun,
  SiAstro,
  SiTauri,
  SiDeno,
  SiSolid,
  SiSvelte,
  SiRemix,
  SiScala,
  SiElixir,
  SiCplusplus,
  SiRuby,
  SiSharp,
  SiApachekafka,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiEthereum,
  SiIpfs,
  SiSpring,
  SiScikitlearn,
  SiPandas,
  SiElasticsearch,
  SiKibana,
  SiOpencv,
  SiOpenai,
  SiStripe,
  SiJsonwebtokens,
  SiNginx,
  SiGithub,
  SiSocketdotio,
} from 'react-icons/si';
import { 
  DiJava,
  DiReact as DiReactNative,
} from 'react-icons/di';
import { 
  FaNetworkWired,
  FaMicrophone,
  FaCamera,
  FaCloud,
  FaRobot,
  FaLock,
  FaServer,
  FaChartLine,
  FaEye,
  FaFileAlt,
  FaHelicopter,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

// Centralized tech icon mapping with optimized colors for dark theme
export const getTechIcon = (tech?: string): { Icon: IconType; color: string } => {
  if (!tech) return { Icon: SiReact, color: '#61DAFB' };
  
  const techLower = tech.toLowerCase();
  
  // Modern Runtimes & Frameworks
  if (techLower.includes('bun')) return { Icon: SiBun, color: '#FBF0DF' };
  if (techLower.includes('astro')) return { Icon: SiAstro, color: '#FF5D01' };
  if (techLower.includes('tauri')) return { Icon: SiTauri, color: '#FFC131' };
  if (techLower.includes('deno')) return { Icon: SiDeno, color: '#70FFAF' };
  if (techLower.includes('solid')) return { Icon: SiSolid, color: '#76B3E1' };
  if (techLower.includes('qwik')) return { Icon: SiReact, color: '#AC7EF4' };
  if (techLower.includes('htmx')) return { Icon: SiReact, color: '#3D72D7' };
  if (techLower.includes('svelte')) return { Icon: SiSvelte, color: '#FF3E00' };
  if (techLower.includes('remix')) return { Icon: SiRemix, color: '#E8F5FD' };
  if (techLower.includes('trpc')) return { Icon: SiReact, color: '#2596BE' };
  if (techLower.includes('turborepo')) return { Icon: SiReact, color: '#EF4444' };
  
  // Traditional Frameworks
  if (techLower.includes('react')) return { Icon: SiReact, color: '#61DAFB' };
  if (techLower.includes('next')) return { Icon: SiNextdotjs, color: '#FFFFFF' };
  if (techLower.includes('vue')) return { Icon: SiVuedotjs, color: '#4FC08D' };
  if (techLower.includes('angular')) return { Icon: SiAngular, color: '#DD0031' };
  
  // Languages
  if (techLower.includes('python')) return { Icon: SiPython, color: '#3776AB' };
  if (techLower.includes('node')) return { Icon: SiNodedotjs, color: '#339933' };
  if (techLower.includes('typescript')) return { Icon: SiTypescript, color: '#3178C6' };
  if (techLower.includes('javascript')) return { Icon: SiJavascript, color: '#F7DF1E' };
  if (techLower.includes('go') || techLower === 'go') return { Icon: SiGo, color: '#00ADD8' };
  if (techLower.includes('rust')) return { Icon: SiRust, color: '#CE422B' };
  if (techLower.includes('java') && !techLower.includes('javascript')) return { Icon: DiJava, color: '#007396' };
  if (techLower.includes('kotlin')) return { Icon: SiKotlin, color: '#7F52FF' };
  if (techLower.includes('swift')) return { Icon: SiSwift, color: '#FA7343' };
  if (techLower.includes('c++')) return { Icon: SiCplusplus, color: '#00599C' };
  if (techLower.includes('c#')) return { Icon: SiSharp, color: '#239120' };
  if (techLower.includes('ruby')) return { Icon: SiRuby, color: '#CC342D' };
  if (techLower.includes('scala')) return { Icon: SiScala, color: '#DC322F' };
  if (techLower.includes('elixir')) return { Icon: SiElixir, color: '#4B275F' };
  if (techLower.includes('solidity')) return { Icon: SiSolidity, color: '#C0C0C0' };
  
  // Mobile
  if (techLower.includes('flutter')) return { Icon: SiFlutter, color: '#02569B' };
  if (techLower.includes('react native')) return { Icon: DiReactNative, color: '#61DAFB' };
  
  // Databases
  if (techLower.includes('mongo')) return { Icon: SiMongodb, color: '#47A248' };
  if (techLower.includes('postgres')) return { Icon: SiPostgresql, color: '#4169E1' };
  if (techLower.includes('mysql')) return { Icon: SiMysql, color: '#4479A1' };
  if (techLower.includes('redis')) return { Icon: SiRedis, color: '#DC382D' };
  if (techLower.includes('firebase')) return { Icon: SiFirebase, color: '#FFCA28' };
  if (techLower.includes('dynamodb')) return { Icon: SiAmazon, color: '#FF9900' };
  if (techLower.includes('elasticsearch')) return { Icon: SiElasticsearch, color: '#005571' };
  
  // DevOps & Cloud
  if (techLower.includes('docker')) return { Icon: SiDocker, color: '#2496ED' };
  if (techLower.includes('kubernetes')) return { Icon: SiKubernetes, color: '#326CE5' };
  if (techLower.includes('terraform')) return { Icon: SiTerraform, color: '#7B42BC' };
  if (techLower.includes('aws') || techLower.includes('lambda')) return { Icon: SiAmazon, color: '#FF9900' };
  if (techLower.includes('azure')) return { Icon: SiReact, color: '#0078D4' };
  if (techLower.includes('gcp') || techLower.includes('google cloud')) return { Icon: SiGooglecloud, color: '#4285F4' };
  if (techLower.includes('kafka')) return { Icon: SiApachekafka, color: '#231F20' };
  if (techLower.includes('prometheus')) return { Icon: SiPrometheus, color: '#E6522C' };
  if (techLower.includes('grafana')) return { Icon: SiGrafana, color: '#F46800' };
  if (techLower.includes('nginx')) return { Icon: SiNginx, color: '#009639' };
  if (techLower.includes('github')) return { Icon: SiGithub, color: '#FFFFFF' };
  
  // ML/AI & Data Science
  if (techLower.includes('tensorflow')) return { Icon: SiTensorflow, color: '#FF6F00' };
  if (techLower.includes('pytorch')) return { Icon: SiPytorch, color: '#EE4C2C' };
  if (techLower.includes('scikit-learn') || techLower.includes('sklearn')) return { Icon: SiScikitlearn, color: '#F7931E' };
  if (techLower.includes('pandas')) return { Icon: SiPandas, color: '#150458' };
  if (techLower.includes('opencv')) return { Icon: SiOpencv, color: '#5C3EE8' };
  if (techLower.includes('openai')) return { Icon: SiOpenai, color: '#412991' };
  if (techLower.includes('transformers') || techLower.includes('huggingface')) return { Icon: FaRobot, color: '#FFD21E' };
  if (techLower.includes('spacy')) return { Icon: FaRobot, color: '#09A3D5' };
  if (techLower.includes('nltk')) return { Icon: FaFileAlt, color: '#3776AB' };
  if (techLower.includes('matplotlib')) return { Icon: FaChartLine, color: '#11557C' };
  if (techLower.includes('networkx')) return { Icon: FaNetworkWired, color: '#FF6B6B' };
  
  // Backend Frameworks
  if (techLower.includes('django')) return { Icon: SiDjango, color: '#0C4B33' };
  if (techLower.includes('fastapi')) return { Icon: SiFastapi, color: '#009688' };
  if (techLower.includes('express')) return { Icon: SiExpress, color: '#FFFFFF' };
  if (techLower.includes('spring')) return { Icon: SiSpring, color: '#6DB33F' };
  
  // Blockchain
  if (techLower.includes('ethereum')) return { Icon: SiEthereum, color: '#3C3C3D' };
  if (techLower.includes('hardhat')) return { Icon: SiEthereum, color: '#FFF100' };
  if (techLower.includes('ipfs')) return { Icon: SiIpfs, color: '#65C2CB' };
  if (techLower.includes('metamask')) return { Icon: SiEthereum, color: '#F6851B' };
  
  // Real-time & Communication
  if (techLower.includes('socket.io')) return { Icon: SiSocketdotio, color: '#010101' };
  if (techLower.includes('webrtc')) return { Icon: FaNetworkWired, color: '#333333' };
  if (techLower.includes('mqtt')) return { Icon: FaNetworkWired, color: '#660066' };
  if (techLower.includes('grpc')) return { Icon: FaServer, color: '#4285F4' };
  
  // Security & Auth
  if (techLower.includes('jwt')) return { Icon: SiJsonwebtokens, color: '#000000' };
  if (techLower.includes('oauth')) return { Icon: FaLock, color: '#EB5424' };
  if (techLower.includes('webauthn')) return { Icon: FaLock, color: '#3C790A' };
  
  // Payment & APIs
  if (techLower.includes('stripe')) return { Icon: SiStripe, color: '#008CDD' };
  if (techLower.includes('api gateway')) return { Icon: SiAmazon, color: '#FF9900' };
  
  // Monitoring & Logging
  if (techLower.includes('elk') || techLower.includes('kibana')) return { Icon: SiKibana, color: '#005571' };
  if (techLower.includes('opentelemetry')) return { Icon: FaEye, color: '#F5A800' };
  if (techLower.includes('cloudwatch')) return { Icon: SiAmazon, color: '#FF9900' };
  
  // Other Tools
  if (techLower.includes('tesseract') || techLower.includes('ocr')) return { Icon: FaEye, color: '#4285F4' };
  if (techLower.includes('drone')) return { Icon: FaHelicopter, color: '#212121' };
  if (techLower.includes('camera')) return { Icon: FaCamera, color: '#FF6B6B' };
  if (techLower.includes('cloud storage')) return { Icon: FaCloud, color: '#4285F4' };
  if (techLower.includes('speech recognition')) return { Icon: FaMicrophone, color: '#4285F4' };
  
  // CSS
  if (techLower.includes('tailwind')) return { Icon: SiTailwindcss, color: '#06B6D4' };
  
  return { Icon: SiReact, color: '#61DAFB' };
};

// Tech Badge Component
export function TechBadge({ tech, isPrimary = false }: { tech: string; isPrimary?: boolean }) {
  const { Icon, color } = getTechIcon(tech);
  
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
        isPrimary
          ? 'bg-accent-orange/10 border-2 border-accent-orange text-accent-orange'
          : 'bg-glass-5 border border-border-10 text-text-90 hover:border-accent-orange/30'
      }`}
    >
      <Icon style={{ color }} className="w-4 h-4" />
      <span>{tech}</span>
    </span>
  );
}

import {
  Atom,
  Book,
  Brain,
  Code2,
  FlaskConical,
  Globe,
  Landmark,
  Languages,
  LucideIcon,
  Music,
  PenLine,
  Sigma,
} from 'lucide-react-native';
import {COLORS} from './colors';

export const subjects = [
  {label: 'matematik', value: 'math', subjectId: 0},
  {label: 'biyoloji', value: 'bio', subjectId: 1},
  {label: 'kimya', value: 'chem', subjectId: 2},
  {label: 'felsefe', value: 'philosophy', subjectId: 3},
  {label: 'fizik', value: 'physics', physicssubjectId: 4},
  {label: 'geometri', value: 'geo', subjectId: 5},
  {label: 'türkçe', value: 'turkish', subjectId: 6},
];

export const subSubjects = [
  {label: 'integral', subjectId: 0, subSubjectId: 0},
  {label: 'paragraf', subjectId: 1, subSubjectId: 1},
];

export function getSubjectVisuals(subject: string): {
  Icon: LucideIcon;
  bgColor: string;
  iconColor: string;
} {
  const lower = subject.toLowerCase();

  let icon;
  if (lower.includes('math')) icon = Sigma;
  if (lower.includes('physics')) icon = Atom;

  if (lower.includes('chem')) icon = FlaskConical; // pastel pink

  if (lower.includes('bio')) icon = Brain;
  if (lower.includes('history')) icon = Landmark; // soft amber
  if (lower.includes('geo')) icon = Globe; // pastel green
  if (lower.includes('english') || lower.includes('language')) icon = Languages; // lavender
  if (lower.includes('literature')) icon = Book; // rose pink
  if (lower.includes('music')) icon = Music; // soft purple
  if (lower.includes('coding') || lower.includes('informatics')) icon = Code2; // mint
  if (lower.includes('philosophy')) icon = PenLine; // soft magenta
  if (lower.includes('turkish')) icon = Book; // soft magenta

  return {
    Icon: icon,
    bgColor: COLORS[`${lower}Bg`],
    iconColor: COLORS[`${lower}Icon`],
  }; // default: pastel gray
}

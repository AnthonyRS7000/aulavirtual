import { 
  DocumentTextIcon,
  PlayIcon,
  DocumentIcon,
  PresentationChartLineIcon,
  XMarkIcon,
  Cog6ToothIcon,
  AcademicCapIcon,
  BookOpenIcon,
  IdentificationIcon,
  BuildingLibraryIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { FaBook } from 'react-icons/fa';
import ClassroomSvg from './classroom.svg';
import DriveSvg from './drive.svg';
import MeetSvg from './meet.svg';
import CalendarSvg from './calendar.svg';
import GmailSvg from './gmail.svg';
import DocsSvg from './docs.svg';

export const IconProyecto = ({ className = "w-6 h-6" }: { className?: string }) => 
  <DocumentTextIcon className={className} />;

export const IconEjecucion = ({ className = "w-6 h-6" }: { className?: string }) => 
  <PlayIcon className={className} />;

export const IconInforme = ({ className = "w-6 h-6" }: { className?: string }) => 
  <DocumentIcon className={className} />;

export const IconSustentacion = ({ className = "w-6 h-6" }: { className?: string }) => 
  <PresentationChartLineIcon className={className} />;

export const IconCierre = ({ className = "w-6 h-6" }: { className?: string }) => 
  <XMarkIcon className={className} />;

export const IconSoporte = ({ className = "w-6 h-6" }: { className?: string }) => 
  <Cog6ToothIcon className={className} />;

export const IconTitulacion = ({ className = "w-6 h-6" }: { className?: string }) => 
  <AcademicCapIcon className={className} />;

export const IconUniversidad = ({ className = "w-6 h-6" }: { className?: string }) => 
  <BuildingLibraryIcon className={className} />;

export const IconAcademico = ({ className = "w-6 h-6" }: { className?: string }) => 
  <BookOpenIcon className={className} />;

export const IconServicio = ({ className = "w-6 h-6" }: { className?: string }) => 
  <IdentificationIcon className={className} />;

export const IconMensajeria = ({ className = "w-6 h-6" }: { className?: string }) => 
  <EnvelopeIcon className={className} />;

/* Google / servicios oficiales */
export const IconClassroom = ({ className = "w-6 h-6", style }: { className?: string; style?: any }) => (
  <img src={ClassroomSvg} className={className} style={style} alt="classroom" />
);

export const IconDrive = ({ className = "w-6 h-6", style }: { className?: string; style?: any }) => (
  <img src={DriveSvg} className={className} style={style} alt="drive" />
);

export const IconMeet = ({ className = "w-6 h-6", style }: { className?: string; style?: any }) => (
  <img src={MeetSvg} className={className} style={style} alt="meet" />
);

export const IconCalendar = ({ className = "w-6 h-6", style }: { className?: string; style?: any }) => (
  <img src={CalendarSvg} className={className} style={style} alt="calendar" />
);

export const IconGmail = ({ className = "w-6 h-6", style }: { className?: string; style?: any }) => (
  <img src={GmailSvg} className={className} style={style} alt="gmail" />
);

export const IconDocs = ({ className = "w-6 h-6", style }: { className?: string; style?: any }) => (
  <img src={DocsSvg} className={className} style={style} alt="docs" />
);

export const IconBiblioteca = ({ className = "w-6 h-6", style }: { className?: string; style?: any }) => (
  <FaBook className={className} style={{ color: 'var(--pantone-zomp)', ...(style || {}) }} />
);

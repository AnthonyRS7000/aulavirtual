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
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

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

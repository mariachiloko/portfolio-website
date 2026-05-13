export type ContentSource = 'local' | 'example';

export interface LinkItem {
  label: string;
  href: string;
}

export interface ProfileContent {
  name: string;
  role: string;
  location: string;
  summary: string;
  strengths: string[];
  links: LinkItem[];
  photo?: string;
  resume?: string;
}

export interface ProjectContent {
  tag: string;
  title: string;
  summary: string;
  stack: string[];
  outcome: string;
}

type JsonModule = {
  default: unknown;
};

const modules = import.meta.glob('./*.json', { eager: true }) as Record<
  string,
  JsonModule
>;

function loadContent<T>(baseName: string): { value: T; source: ContentSource } {
  const localKey = `./${baseName}.local.json`;
  const exampleKey = `./${baseName}.example.json`;

  const localModule = modules[localKey];
  if (localModule) {
    return {
      value: localModule.default as T,
      source: 'local',
    };
  }

  const exampleModule = modules[exampleKey];
  if (exampleModule) {
    return {
      value: exampleModule.default as T,
      source: 'example',
    };
  }

  throw new Error(`Missing ${baseName}.example.json`);
}

const profileContent = loadContent<ProfileContent>('profile');
const projectsContent = loadContent<ProjectContent[]>('projects');

export const profile = profileContent.value;
export const projects = projectsContent.value;

export const contentSource = {
  profile: profileContent.source,
  projects: projectsContent.source,
};

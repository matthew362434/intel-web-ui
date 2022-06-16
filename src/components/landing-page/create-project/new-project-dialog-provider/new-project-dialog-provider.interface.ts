export interface NewProjectDialogContextProps {
  save: () => void;
  isLoading: boolean;
  metadata: Project;
  updateProjectState: (projectState: Partial<Project>) => void;
}

interface SelectProjectTemplateProps {
  name: string;
}

export type Project = SelectProjectTemplateProps;

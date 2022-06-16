interface Dataset {
  id: string;
  name: string;
}

interface ProjectPropsCommon {
  id: string;
  name: string;
  creationDate: Date;
  thumbnail: string;
}

export interface ProjectProps extends ProjectPropsCommon {}
export type CreateProjectProps = Omit<ProjectProps, 'datasets'>;

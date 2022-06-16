import 'twin.macro';
import { NewProjectDialog, NewProjectDialogProvider } from '../create-project';

export const LandingContent = (): JSX.Element => {
  const projectActions = (
    <div tw="my-auto flex gap-[12px] justify-end">
      <div>{/* Search component */}</div>
      <div>{/* Filter component */}</div>
      <div>{/* Import button component */}</div>
      <NewProjectDialogProvider>
        <NewProjectDialog buttonText={'Create new project'} />
      </NewProjectDialogProvider>
    </div>
  );

  return (
    <>
      <div tw="flex justify-end mt-[16px]">{projectActions}</div>
      <div>{/* Project List Component */}</div>
    </>
  );
};

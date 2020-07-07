import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { IndividualProject } from './IndividualProject';

export const Projects = ({ activeValue = null }) => {

  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.name}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? 'sidebar__project active'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
            console.log({ projectId: project.projectId });
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              setSelectedProject(project.id);
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool,
};

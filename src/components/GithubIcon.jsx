import React from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';

export default function GitHubLink() {
  return (
    <Tooltip label="View source on GitHub" withArrow>
      <ActionIcon
        component="a"
        href="https://github.com/ciabalaiz/rstats"
        target="_blank"
        size="lg"
        variant="transparent" 
        aria-label="GitHub repository"
      >
        <img
          src="https://github.githubassets.com/favicons/favicon.svg"
          alt="GitHub"
          width={28}
          height={28}
          style={{ display: 'block' }}
        />
      </ActionIcon>
    </Tooltip>
  );
}

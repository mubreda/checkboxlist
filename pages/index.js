import React from 'react';
import Box from '../src/components/foundation/layout/Box';
import Grid from '../src/components/foundation/layout/Grid';
import TreeItem from '../src/components/TreeItem';
import { TreeContextProvider } from '../src/context/tree';
import data from '../src/data.json';
import Logo from '../src/theme/Logo';

export default function Home() {
  return (
    <div>
      <Box
        flex="1"
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Grid.Container
          marginTop={{
            xs: '32px',
            md: '75px',
          }}
        >
          <Logo />
          <TreeContextProvider>
            {Object.values(data).map((node) => (
              <TreeItem node={node} key={node.id} />
            ))}
          </TreeContextProvider>
        </Grid.Container>
      </Box>
    </div>
  );
}

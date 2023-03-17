import { useEntity } from '@backstage/plugin-catalog-react';
import * as React from 'react';

export const MyPluginEntityContent: React.FunctionComponent = () => {
  const { entity } = useEntity();

  return <span>{entity.kind}</span>;
};


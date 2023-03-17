import React from 'react';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import { fetchApiRef, useApi } from '@backstage/core-plugin-api';
import useAsync from 'react-use/lib/useAsync';

type Repo = {
  url: string;
  repoName: string;
  forked: boolean;
  description: string;
};

type DenseTableProps = {
  repos: Repo[];
};

export const DenseTable = ({ repos }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: 'Repo Name', field: 'repoName' },
    { title: 'Url', field: 'url' },
    { title: 'Forked', field: 'forked' },
    { title: 'Description', field: 'description' },
  ];

  return (
    <Table
      title="Repositories in debsmita1"
      options={{ search: false, paging: false }}
      columns={columns}
      data={repos}
    />
  );
};

export const ExampleFetchComponent = () => {
  const { fetch } = useApi(fetchApiRef);
  const { value, loading, error } = useAsync(async (): Promise<any[]> => {
    const response = await fetch(
      'https://api.github.com/users/debsmita1/repos',
    );

    const data = await response.json();
    return data;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }
  const repositories = value?.map(val => {
    return {
      repoName: val?.name,
      forked: val?.fork,
      description: val?.description,
      url: val?.url,
    };
  });

  return <DenseTable repos={repositories || []} />;
};

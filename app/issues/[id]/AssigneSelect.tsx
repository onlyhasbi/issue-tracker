'use client';

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useState, useEffect } from 'react';

type Props = {};

function AssigneSelect({}: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>('/api/users').then(({ data }) => setUsers(data));
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneSelect;

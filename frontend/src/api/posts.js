export const fetchPosts = () => {
    return Promise.resolve([
      {
        id: 1,
        username: 'joao_dev',
        content: 'Primeiro post! 👋',
      },
      {
        id: 2,
        username: 'maria_coder',
        content: 'React é maravilhoso!',
      },
      {
        id: 3,
        username: 'user123',
        content: 'Bom dia galera! ☀️',
      },
    ]);
  };
  
'use client';

export default function Home() {
  const username = localStorage.getItem('username');
  return <main>{username && <h1>{username}</h1>}</main>;
}

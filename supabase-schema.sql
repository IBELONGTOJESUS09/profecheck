create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  correo text unique,
  telefono text unique,
  contrasena text not null
);

create table if not exists public.asistencia (
  id uuid primary key default gen_random_uuid(),
  hora text not null,
  numero_empleado text not null,
  maestro text not null,
  materia text not null,
  estado text not null default 'Presente'
);

insert into public.asistencia (hora, numero_empleado, maestro, materia, estado)
values
  ('1:30', '241402800516', 'Pazos', 'Programacion', 'Presente'),
  ('4:30', '241402800517', 'Hugo', 'Matematicas', 'Ausente')
on conflict do nothing;

export type UserRow = {
  id: string;
  nombre: string;
  correo: string | null;
  telefono: string | null;
  password: string;
};

export type AsistenciaRow = {
  id: string;
  hora: string;
  numero_empleado: string;
  maestro: string;
  materia: string;
  estado: "Presente" | "Ausente" | "Hora adelantada";
};

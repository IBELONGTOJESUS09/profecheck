import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const sourceBySlug: Record<string, string> = {
  trabajo:
    "C:\\Users\\jezuz\\.cursor\\projects\\c-Users-jezuz-Nueva-carpeta-Proyecto-en-equipo\\assets\\c__Users_jezuz_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-7b340b12-8108-4454-a375-b39c324c3d0f.png",
  madres:
    "C:\\Users\\jezuz\\.cursor\\projects\\c-Users-jezuz-Nueva-carpeta-Proyecto-en-equipo\\assets\\c__Users_jezuz_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-e314c48a-b88e-42c3-b558-57cd3edbf8fd.png",
  consejo:
    "C:\\Users\\jezuz\\.cursor\\projects\\c-Users-jezuz-Nueva-carpeta-Proyecto-en-equipo\\assets\\c__Users_jezuz_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-f4730a6d-d2a6-4a14-93c1-6b1523833ac2.png",
  maestro:
    "C:\\Users\\jezuz\\.cursor\\projects\\c-Users-jezuz-Nueva-carpeta-Proyecto-en-equipo\\assets\\c__Users_jezuz_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-76f315c7-8b5a-44ab-b2dc-a5e8638902b0.png"
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const sourcePath = sourceBySlug[slug];

  if (!sourcePath) {
    return NextResponse.json({ error: "Aviso no encontrado." }, { status: 404 });
  }

  try {
    const buffer = await readFile(sourcePath);
    const ext = path.extname(sourcePath).toLowerCase();
    const contentType = ext === ".png" ? "image/png" : "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch {
    return NextResponse.json({ error: "No se pudo cargar la imagen." }, { status: 500 });
  }
}

// Lanzador de Kage: abre archivos\Kage.exe que está junto a este programa.
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <wchar.h>

int WINAPI wWinMain(HINSTANCE h, HINSTANCE p, PWSTR args, int show) {
    wchar_t dir[MAX_PATH * 2], exe[MAX_PATH * 2], cmd[MAX_PATH * 4];
    DWORD n = GetModuleFileNameW(NULL, dir, MAX_PATH * 2);
    if (!n) return 1;
    wchar_t *slash = wcsrchr(dir, L'\\');
    if (slash) *slash = 0;
    swprintf(exe, MAX_PATH * 2, L"%ls\\archivos\\Kage.exe", dir);
    swprintf(cmd, MAX_PATH * 4, L"\"%ls\" %ls", exe, args ? args : L"");
    wchar_t wd[MAX_PATH * 2];
    swprintf(wd, MAX_PATH * 2, L"%ls\\archivos", dir);
    STARTUPINFOW si; PROCESS_INFORMATION pi;
    ZeroMemory(&si, sizeof si); si.cb = sizeof si; ZeroMemory(&pi, sizeof pi);
    if (!CreateProcessW(exe, cmd, NULL, NULL, FALSE, 0, NULL, wd, &si, &pi)) {
        MessageBoxW(NULL, L"No se encuentra la carpeta 'archivos'.\nDescomprime el zip completo sin mover nada.", L"Kage", MB_ICONERROR);
        return 1;
    }
    CloseHandle(pi.hThread); CloseHandle(pi.hProcess);
    return 0;
}

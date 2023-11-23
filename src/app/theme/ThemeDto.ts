enum Theme {
    LIGHT = "LIGHT", DARK = "DARK"
}

export class ThemeDto {
    private constructor(private readonly theme: Theme) {
    }

    public get isDark(): boolean {
        return this.theme === Theme.DARK;
    }

    public get isLight(): boolean {
        return this.theme === Theme.LIGHT;
    }

    public static light(): ThemeDto {
        return new ThemeDto(Theme.LIGHT);
    }

    public static dark(): ThemeDto {
        return new ThemeDto(Theme.DARK);
    }
}
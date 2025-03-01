import { IsString, IsNotEmpty, IsInt, IsEnum } from 'class-validator';

class CreateAssetDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsInt()
    location_id: number;

    @IsEnum(['actived', 'unactive'])
    status: 'actived' | 'unactive';
}

export { CreateAssetDto };

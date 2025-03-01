import { DataSource } from 'typeorm';
import { Location, Organization } from '@entities';
import { loggerHelper } from '@common/helpers';

export const run = async (dataSource: DataSource) => {
    try {
        const organizationRepository = dataSource.getRepository(Organization);
        const locationRepository = dataSource.getRepository(Location);

        const pns = await organizationRepository.save({ name: 'PNS' });
        const plj = await organizationRepository.save({ name: 'PLJ' });

        await locationRepository.save({ name: 'Da Nang', organization: pns });
        await locationRepository.save({ name: 'Ha Noi', organization: pns });
        await locationRepository.save({ name: 'Ho Chi Minh', organization: plj });
        await locationRepository.save({ name: 'Nghe An', organization: plj });
        await locationRepository.save({ name: 'Can Tho', organization: plj });
    } catch (error) {
        loggerHelper.error(`seedData: ${error}`);
        throw error;
    }
};

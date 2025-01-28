import { Update } from '~/components/Update';
import { Update as UpdateData } from '~/routes/update';

export interface UpdatesProps {
    updates: UpdateData[];
}

export const Updates = ({ updates }: UpdatesProps) => {
    return (
        <div>
            {updates.map((update) => (
                <Update
                    key={update.version}
                    version={update.version}
                    description={update.notes}
                />
            ))}
        </div>
    );
};

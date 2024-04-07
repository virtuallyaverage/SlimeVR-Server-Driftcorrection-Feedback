import {useLocalization} from "@fluent/react";
import {Typography} from '@/components/commons/Typography';
import {driftCompDataT} from 'solarxr-protocol';
import {getYawInDegrees} from '@/maths/quaternion'
import {QuatT} from "solarxr-protocol";
import {log} from "@/utils/logging";


export function TrackerDriftStats({
                                      driftCompData,
                                      textColor,
                                  }: {
    driftCompData: driftCompDataT | null;
    textColor: string | null;

}) {
    const {l10n} = useLocalization();

    //use example till we get full server side setup
    class ExampleData extends driftCompDataT {
        driftCompEnable = true;
        resetInterval = [1, 2, 3, 4, 5, 6];
        maxResets = 5;
        differenceDeg = [-16, 5, 7, 32, 64, 52];
        compensationDeg = [0, 2, 5, 15, 45 ,-65];

    }

    driftCompData = new ExampleData();

    if (!driftCompData)
        return (<div className="flex gap-2">
            No Data
        </div>);

    if (!driftCompData.driftCompEnable) {
        return (<div className="flex gap-2">
            Drift Compensation Disabled
        </div>);
    }

    let degreesDrifted = 0;
    driftCompData.differenceDeg.forEach(x => {
        degreesDrifted += x;
    });

    let timeDrifted = 0;
    driftCompData.resetInterval.forEach(x => {
        timeDrifted += x;
    });

    let degreesComp = 0;
    driftCompData.compensationDeg.forEach((x) => {
        degreesComp += x;
    });

    log(degreesDrifted, degreesComp, timeDrifted);

    textColor = !textColor ? 'primary' : textColor;
    return (
        <div className="flex gap-2">
            <Typography color={textColor} whitespace="whitespace-nowrap">
                Resets Recorded: {driftCompData.resetInterval.length}/{driftCompData.maxResets}
            </Typography>
            <Typography color={textColor} whitespace="whitespace-nowrap">
                Drift: {(degreesDrifted/timeDrifted).toFixed(2)}/s Compensation: {(degreesComp/timeDrifted).toFixed(2)}/s
            </Typography>
        </div>
    );
}

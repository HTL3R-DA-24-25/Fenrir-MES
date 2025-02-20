export type DatapointTimer = {
    xid: string;
    date: Date;
    startTime: string;
    endTime: string;
    on: boolean;
}

const datapointTimers: DatapointTimer[] = [];

export function addDatapointTimer (datapointTimer: DatapointTimer) {
    datapointTimers.push(datapointTimer);
    // console.log(datapointTimers)
}

export function getDatapointTimers () {
    return datapointTimers;
}

export function deleteDatapointTimer( index: number ) {
    if(index !== -1) {
        datapointTimers.splice(index, 1);
    }
}
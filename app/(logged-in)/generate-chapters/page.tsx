import React from 'react';
import GenerateChildComponent from './generate-child-component';

const GenerateChaptersPage = () => {

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <GenerateChildComponent />
            </div>
        </div>
    )
};

export default GenerateChaptersPage
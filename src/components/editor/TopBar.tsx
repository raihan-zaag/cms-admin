import { convertCraftJsonToHtml } from "@/lib/convertCraftJsonToHtml";
import { downloadHtmlFile, generateFullHtmlDocument } from "@/lib/utils";
import { useEditor } from "@craftjs/core";


const TopBar = () => {

    const { enabled, canUndo, canRedo, actions, query } = useEditor((state, query) => ({
        enabled: state.options.enabled,
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),

    }));
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
                Page Builder
            </h1>
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => {
                        actions.setOptions((options) => (options.enabled = !enabled));
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
                    {enabled ? 'Finish Editing' : 'Edit'}
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => {
                        const json = query.serialize();
                        console.log(JSON.parse(json));
                        // const htmlOutput = convertCraftJsonToHtml(JSON.parse(json));
                        // console.log(htmlOutput);
                        // const fullHtml = generateFullHtmlDocument(htmlOutput);
                        // downloadHtmlFile('page.html', fullHtml);

                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default TopBar;
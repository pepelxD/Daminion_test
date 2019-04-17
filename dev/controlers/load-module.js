export default async function(path, name) {
    return {default: name} = await import(path);
}
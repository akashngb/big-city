import pickle

with open('label_encoders.pkl', 'rb') as f:
    encoders = pickle.load(f)

neighbourhood_encoder = encoders['NEIGHBOURHOOD_CLEAN']

with open('neighbourhood_encoding.txt', 'w') as f:
    f.write("COMPLETE NEIGHBOURHOOD ENCODING\n")
    f.write("=" * 50 + "\n")
    f.write(f"Total unique neighbourhoods: {len(neighbourhood_encoder.classes_)}\n")
    f.write("=" * 50 + "\n\n")
    
    for i, neighbourhood_name in enumerate(neighbourhood_encoder.classes_):
        f.write(f"{i:3d} → {neighbourhood_name}\n")

print(f"✓ Saved complete list to 'neighbourhood_encoding.txt'")
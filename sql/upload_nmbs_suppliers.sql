-- Upload 306 NMBS Suppliers with Organization Affiliations
-- UK Building Merchant SaaS - NMBS Supplier Data Import
-- Created: 2025-01-08

-- Set NMBS organization ID as variable for reuse
-- NMBS Organization ID: 9307d673-0fb8-4533-8c6f-d9c1f114330c

-- First, let's create a temporary table for bulk insert
CREATE TEMP TABLE temp_nmbs_suppliers (
    supplier_name TEXT,
    supplier_website TEXT
);

-- Insert all 306 NMBS suppliers
INSERT INTO temp_nmbs_suppliers (supplier_name, supplier_website) VALUES
('Abracs', 'www.abracs.com/'),
('ACO Technologies plc', 'www.aco.co.uk/'),
('Acheson & Glover', 'www.ag.uk.com/'),
('Ademco 1 Ltd, Honeywell Home', 'www.heatingcontrols.honeywellhome.com/'),
('Adey Innovations', 'www.adey.co.uk/'),
('Aerosol Solutions Ltd', 'www.aerosolsolutions.co.uk/'),
('AGA Rangemaster', 'www.leisuresinks.co.uk/'),
('Aggregate Industries/ Bradstone/ Charcon', 'www.bradstone.com/'),
('AIM Solder UK LTD', 'www.aimsolder.com/'),
('Airflow ( Nicoll Ventilators) Ltd', 'www.airflow-vent.co.uk/'),
('Aliaxis UK (including Hunter and Marley Plumbing)', 'www.aliaxis.co.uk/'),
('Allegion UK Ltd', 'www.allegion.co.uk/'),
('Allen Concrete', 'www.allenconcrete.co.uk/'),
('Alumasc Building Products', 'www.alumascbp.co.uk/'),
('Altecnic Ltd', 'www.altecnic.co.uk/'),
('A Perry Hinges', 'www.perrytrade.co.uk/'),
('Apptel Limited', 'www.apptel.co.uk/'),
('Aqualisa', 'www.aqualisa.co.uk/'),
('Arctic Hayes', 'www.aqualisa.co.uk/'),
('Armorgard Ltd', 'www.armorgard.co.uk/'),
('Ariston Thermo', 'www.ariston.com/'),
('Artex', 'www.artexltd.com/'),
('Assa Abloy', 'www.yale.co.uk/en/yale/couk/'),
('Astroflame Fireseals Ltd', 'www.astroflame.com/'),
('Avenue Insurance Partners Ltd', 'www.avenueinsurance.co.uk/'),
('Baxi Heating', 'www.baxiheating.co.uk/'),
('Belgrade Insulation Ltd', 'www.belgradeinsulations.com/'),
('Birchwood Price Tools', 'www.birchwoodpricetools.com/'),
('Birtely Group - Lintels/Expamet/Construction', 'www.birtleygroup.co.uk/'),
('BIZ Power Tools Ltd', 'www.bizengineering.com/'),
('BLM British Lead', 'www.britishlead.co.uk/'),
('Bostik', 'www.bostik.com/uk'),
('Bottom Line - energy consultants', 'www.bottomlineutilities.com/'),
('BP Oil UK Limited', 'www.bp.com/'),
('Bradstone & Charcon', 'www.breedongroup.com/'),
('Breedon Group', 'www.breedongroup.com/'),
('Brett Landscaping', 'www.brettlandscaping.co.uk/'),
('Brett Martin', 'www.brettmartin.com/'),
('Brian Hyde', 'www.brianhyde.co.uk/'),
('Briggs', 'www.briggssafetywear.co.uk/'),
('Bristol Tile Company', 'www.bristol-tile.co.uk/'),
('British Gypsum', 'www.british-gypsum.com/'),
('Bruce Douglas Marketing Ltd (Ultratape)', 'www.ultratape.com/'),
('BSW Timber Ltd', 'www.bsw.co.uk/'),
('Buckler Boots Ltd', 'www.bucklerboots.com/'),
('Building Adhesives (Dunlop)', 'www.dunloptrade.com/'),
('Burg-Wachter UK Ltd', 'www.burg.biz/uk'),
('Business Insurance Services', 'www.mofs.co.uk/bis/'),
('Calder Lead', 'www.calderlead.co.uk/'),
('Calders and Grandidge', 'www.caldersandgrandidge.com/'),
('Carlisle Brass', 'www.carlislebrass.com/'),
('Castacrete Ltd', 'www.castacrete.co.uk/'),
('Castle Brooke Tools', 'www.castlebrooke.co.uk/'),
('Catnic', 'www.catnic.com/'),
('Cavity Trays Ltd', 'www.cavitytrays.co.uk/'),
('CDA Group', 'www.cda.eu/'),
('Cellecta Limited', 'www.cellecta.co.uk/'),
('Cembrit', 'www.cembrit.co.uk/'),
('Cemex Concrete Products', 'www.cemex.co.uk/'),
('Centurion Europe Ltd', 'www.centurioneurope.co.uk/'),
('Ceramic Tile Distributors', 'www.ctdtiles.co.uk/'),
('Chain Products', 'www.chainproducts.co.uk/'),
('Charltons Gates & Fencing', 'www.charltonsgates.com/'),
('Cheshire Mouldings Limited', 'www.cheshiremouldings.co.uk/'),
('Chesterfelt Ltd', 'www.chesterfelt.co.uk/'),
('Ciret', 'www.ciret.co.uk/'),
('Clark Drain Ltd', 'www.clark-drain.com/'),
('Claygate Distribution', 'www.claygate.co.uk'),
('Clear Amber Group Ltd', 'www.clearamber.com/'),
('Cottam Brush Ltd', 'www.cottambrush.com/'),
('Coxdome', 'www.coxdome.co.uk/'),
('CQFD Profiles', 'www.cqfdprofiles.com/'),
('CQI Ltd t/a Embrass Peerless', 'www.embrasspeerless.co.uk/'),
('Cromar Building Products', 'www.cromar.uk.com/'),
('Croydex', 'www.croydex.com/'),
('Danfoss Ltd', 'www.heating.danfoss.co.uk/'),
('DART Tool Group', 'www.darttoolgroup.com/'),
('Davant', 'www.davant.co.uk/'),
('Deanta UK Ltd', 'www.deantawood.co.uk/'),
('Dickies', 'www.dickiesworkwear.com/uk'),
('Digby Stone', 'www.digbystone.com/'),
('Draper Tools', 'www.drapertools.com/'),
('Duro Yokota Ltd', 'www.duro-diamonds.com/'),
('Easy Trim Roofing & Construction', 'www.easy-trim.co.uk/'),
('EBP Building Products', 'www.ebpbuilding.com/'),
('EJ Fabrication and Access Solutions Ltd', 'www.ejco.com/em/en'),
('Electrolux Major Appliances', 'www.electrolux.co.uk/'),
('Eliza Tinsley / Avocet Hardware', 'www.elizatinsley.co.uk/'),
('Elnur UK', 'www.elnur.co.uk/'),
('Encon Insulation', 'www.merchantchoice.co.uk/'),
('Etex (Exteriors)UK Ltd', 'www.etexgroup.com/'),
('Eucotherm', 'www.eucotherm.com/'),
('F Ball & Co Ltd - Setcrete', 'www.setcrete.co.uk/'),
('Fabdec Limited', 'www.fabdec.com/'),
('Fakro GB Ltd', 'www.fakro.co.uk/'),
('FEIN Industrial Power Tools', 'www.fein.com/en_uk'),
('Fernox', 'www.fernox.com/'),
('Fillcrete Limited', 'www.fillcrete.com/'),
('Filplastic', 'www.filstorage.com/'),
('Fischer Fixings', 'www.fischer.co.uk/'),
('First Trace Heating', 'www.first-traceheating.co.uk/'),
('Flambeau Europlast', 'www.flamcogroup.com/'),
('Flamco Ltd', 'www.flamcogroup.com/'),
('Flex Power Tools', 'www.flex-tools.com/'),
('Flexseal Ltd', 'www.flexseal.co.uk/'),
('Floplast', 'www.floplast.co.uk/'),
('Forgefix', 'www.forgefix.co.uk/'),
('Formpave', 'www.forterra.co.uk/formpave'),
('Franke UK', 'www.franke.co.uk/'),
('Frelan Hardware ltd', 'www.frelanironmongery.com/'),
('Frisco UK Sales Limited', 'www.frisco.co.uk/'),
('Garrison Dales', 'www.garrisondales.co.uk/'),
('Geosynthetics Ltd', 'www.geosyn.co.uk/'),
('Grant Westfield', 'www.grantwestfield.co.uk/'),
('Gripsure (UK) Ltd', 'www.gripsure.co.uk/'),
('Grono', 'www.grono.co.uk/'),
('GRS Bagging', 'www.grsroadstone.co.uk/'),
('Grundfos Pumps Ltd', 'www.uk.grundfos.com/'),
('Guttercrest Ltd', 'www.guttercrest.co.uk/'),
('H&V Controls', 'www.hav.co.uk/'),
('H+H UK Limited', 'www.hhcelcon.co.uk/'),
('Haemmerlin', 'www.haemmerlin.co.uk/'),
('Hambleside Danelaw', 'www.hambleside-danelaw.co.uk/'),
('Hansgrohe', 'www.hansgrohe.co.uk/'),
('Harlequin MFG Ltd', 'www.harlequinplastics.co.uk/'),
('Helifix', 'www.helifix.co.uk/'),
('HiB Ltd', 'www.hib.co.uk/'),
('HiKOKI', 'www.hikoki-powertools.co.uk/'),
('Homepack Limited', 'www.homepackltd.co.uk/'),
('Hoppe UK', 'www.hoppe.co.uk/'),
('Icopal', 'www.icopal.co.uk/'),
('Ideal Bathrooms', 'www.idealbathrooms.com/'),
('IKO plc', 'www.ikogroup.co.uk/'),
('Industrial Textiles & Plastics Ltd', 'www.itpltd.com/'),
('Interclamp', 'www.interclamp.com/'),
('Irsap UK Ltd', 'www.irsap.co.uk/'),
('James Hardie', 'www.jameshardie.co.uk/'),
('JB Kind', 'www.jbkind.com/'),
('Jefferson Professional Tools & Equipment', 'www.jeffersontools.com/'),
('Jeld - Wen Uk', 'www.jeld-wen.co.uk/'),
('John George', 'www.johngeorge.co.uk/'),
('Joule UK Ltd', 'www.jouleuk.co.uk/'),
('JRC Roofing Distributors', 'www.jrcslate.co.uk/'),
('JSP', 'www.jspsafety.com/'),
('Just1Source & Supply Limited', 'www.just1source.com/'),
('Karcher UK Ltd', 'www.karcher.co.uk/'),
('Kendon Rope and Twine', 'www.kendon.co.uk/'),
('KestrelBCE', 'www.kbp.co.uk/'),
('Keylite Roof Windows Limited', 'www.keyliteroofwindows.com/'),
('Keystone Lintels & IG Lintels', 'www.keystonegroup.co.uk/brands/keystone-lintels/'),
('Klingspor Abrasives', 'www.klingspor.co.uk/'),
('Knauf Insulation', 'www.knaufinsulation.co.uk/'),
('Knauf UK', 'www.knauf.co.uk/'),
('Kyocera Senco UK Ltd', 'www.kyocera-senco.co.uk/'),
('L.D.D.Ltd.', 'www.leakerdirect.co.uk/'),
('LPD Doors', 'www.lpddoors.co.uk/'),
('Lecico', 'www.lecico.co.uk/'),
('Liberon UK', 'www.liberon.co.uk/'),
('Long Rake Spar', 'www.longrakespar.co.uk/'),
('Luceco PLC', 'www.luceco.com/uk'),
('Lyreco UK', 'www.lyreco.com/'),
('M. Greenaway and Son Ltd', 'www.greenaways.co.uk/'),
('Makita UK Ltd', 'www.makitauk.com/'),
('Manrose Manufacturing Ltd', 'www.manrose.com/'),
('Marcrist International', 'www.marcrist.co.uk/'),
('Mark Vitow Limited', 'www.markvitow.com/'),
('Marley Alutec', 'www.marleyalutec.co.uk/'),
('Marley Limited', 'www.marley.co.uk/'),
('Marshalls', 'www.marshalls.co.uk/'),
('Marsh Industries', 'www.marshindustries.co.uk/'),
('Masefield Beta', 'www.masefield-beta.co.uk/'),
('MasterFlow', 'www.masterflow.uk.com/'),
('Maurice Lay / Caple', 'www.caple.co.uk/'),
('Measure-Quip Ltd', 'www.measure-quip.com/'),
('Melpass Ltd', 'www.melpass.co.uk/'),
('Mermaid Panels', 'www.mermaidpanels.com/'),
('Metabo UK Ltd', 'www.metabo.com/uk/en/'),
('Methven UK', 'www.methven.com/'),
('Midland Lead Limited', 'www.midlandlead.co.uk/'),
('Milwaukee', 'www.milwaukeetool.co.uk/'),
('Mission Rubber', 'www.missionrubber.co.uk/'),
('M.Marcus Ltd', 'www.m-marcus.com/'),
('Monarch Water Ltd', 'www.monarchwater.co.uk/'),
('Montpellier Domestic Appliances', 'www.montpellier-appliances.com/'),
('Monument Tools Ltd', 'www.monument-tools.com/'),
('Mueller Europe Ltd', 'www.muellereurope.com/'),
('MX Group', 'www.mx-group.com/'),
('National Abrasives Ltd', 'www.national-abrasives.co.uk/'),
('National Shower Spares', 'www.showerspares.com/'),
('Naylor Concrete Products', 'www.naylor.co.uk/'),
('Naylor Drainage Ltd', 'www.naylor.co.uk/'),
('Nicholls & Clarke Group', 'www.ncdirect.co.uk/'),
('OmegaFlex (TracPipe)', 'www.omegaflex.co.uk/'),
('Orkla', 'www.orkla.com/'),
('Osborn Dronco', 'www.osborn.com/'),
('Owlett-Jaton', 'www.ojtrade.co.uk/'),
('Parkes Products', 'www.parkesgroup.co.uk/'),
('Pavestone Ltd', 'www.pavestone.co.uk/'),
('PC Henderson', 'www.pchenderson.com/'),
('Pegler Yorkshire', 'www.pegleryorkshire.co.uk/'),
('PJH Group', 'www.pjh.uk/'),
('Polydrain Civils', 'www.polydraincivils.com/'),
('Polypipe Building Products', 'www.polypipe.com/'),
('PPG', 'www.ppg.com/'),
('Premier Diamond Products Ltd', 'www.premierdiamondproducts.co.uk/'),
('Presto International UK Ltd', 'www.presto-tools.co.uk/'),
('Primaflow Ltd', 'www.primaflowfandp.co.uk/'),
('Principal Building Products Ltd', 'www.pbpltd.co.uk/'),
('Progressive Safety Ltd', 'www.psf.co.uk/'),
('Qualtex', 'www.qualtexuk.com/'),
('Quanti-Quote', 'www.quantiquote.co.uk/'),
('Quinn Building Products', 'www.quinn-buildingproducts.com/'),
('Red Gorilla International', 'www.redgorilla.red/'),
('Regin Products Ltd', 'www.regin.co.uk/'),
('Reisser Ltd', 'www.reisser.co.uk/'),
('Reliance Manufacturing', 'www.reliancewheelbarrows.co.uk/'),
('Resapol Ltd', 'www.resapol.com/'),
('Resources Group', 'www.the-resources-group.com/'),
('Rexel', 'www.rexel.co.uk/'),
('Robert Bosch Ltd', 'www.bosch-professional.com/gb/en/'),
('Rockwool UK', 'www.rockwool.co.uk/'),
('Rodo Ltd', 'www.prodec.uk.com/'),
('Rollins & Sons', 'www.rollins.co.uk/'),
('ROM Ltd', 'www.rom.co.uk/'),
('Rothenberger', 'www.rothenberger.com/us-en'),
('Rowlinson Garden Products Ltd.', 'www.rowgar.co.uk/'),
('Roxor Group (Ultra Finishing)', 'www.premierbathroomcollection.co.uk/'),
('ROYD Tool Group', 'www.roydtoolgroup.com/'),
('Rustins Ltd', 'www.rustins.ltd/'),
('Sabrefix (UK) Ltd', 'www.sabrefix.co.uk/'),
('Saint-Gobain Abrasives', 'www.saint-gobain-abrasives.com/'),
('Samac Fixings Ltd', 'www.samacfixings.co.uk/'),
('Saneux', 'www.saneux.com/'),
('SCA Wood UK Ltd', 'www.sca.com/'),
('Schiedel Chimney Systems Ltd', 'www.schiedel.co.uk/'),
('Sealey Tools', 'www.sealey.co.uk/'),
('Sherwin Williams', 'www.sherwin-williams.co.uk/'),
('Showerdrape Ltd', 'www.showerdrape.co.uk/'),
('Siamp Ltd', 'www.siamp.co.uk/'),
('SIG Distribution', 'www.sigplc.com/'),
('SIG Roofing', 'www.sigplc.com/'),
('Sika Everbuild', 'www.everbuild.co.uk/'),
('Simpson Strong-Tie', 'www.strongtie.co.uk/'),
('Slatescape Limited', 'www.slatescape.co.uk/'),
('Smiths Briten', 'www.purebathroomcollection.co.uk/'),
('Smith Partnership', 'www.smithpartnership.co.uk/'),
('Soudal UK', 'www.soudal.com/'),
('Southgate Plastics Ltd', 'www.stormbuildingproducts.com/'),
('Spax (UK) Limited', 'www.spax.com/'),
('Spear & Jackson', 'www.spear-and-jackson.com/'),
('Stamco', 'www.stamco.co.uk/'),
('Stearn Electric', 'www.stearn.co.uk/'),
('Sterling Safetywear Ltd', 'www.sterlingsafetywear.co.uk/'),
('Stone Plus UK', 'www.stoneplusuk.co.uk/'),
('Stax Trade Centres', 'www.staxtradecentres.co.uk/'),
('STS Ltd', 'www.sts-uk.com/'),
('Stressline', 'www.stressline.net/'),
('Supreme Concrete', 'www.supremeconcrete.co.uk/'),
('SureCav Limited', 'www.surecav.co.uk/'),
('Surestop LTD', 'www.surestop.co.uk/'),
('Swiftec Global Ltd', 'www.swiftec.co.uk/'),
('Symphony Bathrooms', 'www.symphony-group.co.uk/'),
('T I Midwood & Co Ltd', 'www.timco.co.uk/'),
('T King Associates Ltd', 'www.tkingassociates.com/'),
('TAFS (Salop) Ltd', 'www.tafs-salop.ltd.uk/'),
('TB Davies', 'www.tbdavies.co.uk/'),
('Teco Building Products', 'www.tecoproducts.co.uk/'),
('Tec-Ties Ltd', 'www.tecties.co.uk/'),
('Telford Copper Cylinders Limited', 'www.telford-group.com/'),
('Teng Tools', 'www.tengtools.co.uk/'),
('Thomas Dudley Limited t/a TYDE', 'www.thomasdudley.co.uk/'),
('Timloc Building Products', 'www.timloc.co.uk/'),
('Timbmet', 'www.timbmet.com/'),
('Toolbank', 'www.toolbank.com/'),
('Tools of The Trade Ltd', 'www.toolsofthetrade.co.uk/'),
('Toolstream Ltd', 'www.toolstream.com/'),
('Towelrads', 'www.towelrads.com/'),
('Tremco Illbruck', 'www.tremco-illbruck.com/en_GB/home/'),
('Trend Machinery', 'www.trend-uk.com/'),
('TT Concrete Products Limited', 'www.ttconcreteproducts.co.uk/'),
('Ubbink UK Ltd', 'www.ubbink.co.uk/'),
('Ultimate Finance Group Limited', 'www.ultimatefinance.co.uk/'),
('Unilin Distribution', 'www.quick-step.co.uk/'),
('Univar Specialty Consumables Limited', 'www.univarsc.com/'),
('Urfic UK', 'www.urfic.co.uk/'),
('Vaillant Group Ltd', 'www.glow-worm.co.uk/'),
('VADO', 'www.vado.com/'),
('VELUX', 'www.velux.co.uk/'),
('Viessmann', 'www.viessmann.co.uk/'),
('Vista Engineering Ltd', 'www.vistaeng.co.uk/'),
('Vogue UK', 'www.vogueuk.co.uk/'),
('Vokera Ltd', 'www.vokera.co.uk/'),
('W.Howard Ltd', 'www.whoward.eu/'),
('Walsh & Blyth', 'www.wbtwholesale.co.uk/'),
('Warmup Plc', 'www.warmup.co.uk/'),
('Waterline', 'www.waterline.co.uk/'),
('Wavin', 'www.wavin.co.uk/'),
('Wernerco', 'www.wernerco.com/eu'),
('West Port', 'www.west-port.co.uk/'),
('Wienerberger', 'www.wienerberger.co.uk/'),
('Wirquin UK Ltd', 'www.wirquin.co.uk/'),
('Wrekin Products', 'www.wrekinproducts.com/'),
('WT Knowles', 'www.wtknowles.co.uk/'),
('Xella UK', 'www.xella.co.uk/'),
('Yorkshire Copper Tube', 'www.fischer.co.uk/'),
('Zehnder group UK Ltd', 'www.zehnder.co.uk/');

-- Now insert into the main suppliers table and create organization affiliations
-- Step 1: Insert suppliers into the suppliers table
INSERT INTO suppliers (
    supplier_name,
    slug,
    supplier_description,
    supplier_website,
    country,
    is_active,
    created_at,
    updated_at
)
SELECT 
    tns.supplier_name,
    LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(tns.supplier_name, ' ', '-'), '&', 'and'), '.', ''), '/', '-'), ',', '')),
    'NMBS affiliated supplier providing tools and building materials to the UK building merchant sector.',
    CASE 
        WHEN tns.supplier_website LIKE 'www.%' THEN 'https://' || tns.supplier_website
        ELSE tns.supplier_website
    END,
    'United Kingdom',
    true,
    NOW(),
    NOW()
FROM temp_nmbs_suppliers tns
WHERE NOT EXISTS (
    SELECT 1 FROM suppliers s 
    WHERE s.supplier_name = tns.supplier_name
);

-- Step 2: Create organization affiliations for all NMBS suppliers
INSERT INTO supplier_organization_affiliations (
    supplier_id,
    organization_id,
    affiliation_type,
    status,
    joined_date,
    organization_specific_data,
    created_at,
    updated_at
)
SELECT 
    s.id,
    '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid, -- NMBS organization ID
    'member',
    'active',
    NOW(),
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'website', s.supplier_website,
        'import_notes', 'Imported from NMBS_Suppliers_Names_Websites_306.csv'
    ),
    NOW(),
    NOW()
FROM suppliers s
INNER JOIN temp_nmbs_suppliers tns ON s.supplier_name = tns.supplier_name
WHERE NOT EXISTS (
    SELECT 1 FROM supplier_organization_affiliations soa
    WHERE soa.supplier_id = s.id 
    AND soa.organization_id = '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid
);

-- Clean up temporary table
DROP TABLE temp_nmbs_suppliers;

-- Display summary of imported suppliers
SELECT 
    COUNT(*) as total_nmbs_suppliers,
    COUNT(DISTINCT s.supplier_name) as unique_supplier_names
FROM suppliers s
INNER JOIN supplier_organization_affiliations soa ON s.id = soa.supplier_id
WHERE soa.organization_id = '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;

-- Display a few sample records to verify
SELECT 
    s.supplier_name,
    s.supplier_website,
    s.slug,
    soa.affiliation_type,
    soa.status,
    soa.organization_specific_data->>'import_notes' as import_notes
FROM suppliers s
INNER JOIN supplier_organization_affiliations soa ON s.id = soa.supplier_id
WHERE soa.organization_id = '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid
ORDER BY s.supplier_name
LIMIT 10;